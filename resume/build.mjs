// Renders resume/template.tex from src/data/resume.json.
//
// Template syntax:
//   %for path%...%endfor%   loop over an array at `path` (dot notation, relative
//                           to the current context, falling back to the root)
//   %if path%...%endif%     render the block only if `path` is truthy
//                           (non-empty string / non-empty array / truthy value)
//   %{path}%                interpolate a value, LaTeX-escaped by default
//   %{path|filter}%         apply a filter; filters can be chained with `|`
//
// Filters:
//   raw          skip LaTeX-escaping (use for URLs passed into \href{...})
//   date         format an ISO date as "MMM YYYY" (e.g. %{startDate|date}%)
//   date:Word    same, but falls back to the literal `Word` when the date is empty
//   join:, sep   join an array of strings with the given separator
//
// `.` as a path refers to the current context itself (used inside a
// %for highlights%...%endfor%% loop, where each item is a plain string).

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import dayjs from 'dayjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const RESUME_JSON = path.join(__dirname, '..', 'src', 'data', 'resume.json')
const TEMPLATE_TEX = path.join(__dirname, 'template.tex')
const OUTPUT_TEX = path.join(__dirname, 'resume.tex')

const TOKEN_RE = /%for\s+([\w.]+)%|%endfor%|%if\s+([\w.]+)%|%endif%|%\{([^}]+)\}%/g

function parseTemplate(source) {
  const root = { type: 'root', children: [] }
  const stack = [root]
  let lastIndex = 0
  let match

  while ((match = TOKEN_RE.exec(source))) {
    const [full, forPath, ifPath, varExpr] = match
    const top = () => stack[stack.length - 1]

    if (match.index > lastIndex) {
      top().children.push({ type: 'text', value: source.slice(lastIndex, match.index) })
    }

    if (forPath !== undefined) {
      const node = { type: 'for', path: forPath, children: [] }
      top().children.push(node)
      stack.push(node)
    } else if (full === '%endfor%') {
      const node = stack.pop()
      if (!node || node.type !== 'for') throw new Error('Mismatched %endfor% in template')
    } else if (ifPath !== undefined) {
      const node = { type: 'if', path: ifPath, children: [] }
      top().children.push(node)
      stack.push(node)
    } else if (full === '%endif%') {
      const node = stack.pop()
      if (!node || node.type !== 'if') throw new Error('Mismatched %endif% in template')
    } else if (varExpr !== undefined) {
      top().children.push({ type: 'var', expr: varExpr })
    }

    lastIndex = TOKEN_RE.lastIndex
  }

  if (lastIndex < source.length) {
    stack[stack.length - 1].children.push({ type: 'text', value: source.slice(lastIndex) })
  }
  if (stack.length !== 1) throw new Error('Unclosed %for%/%if% block in template')

  return root
}

function getPath(obj, dotPath) {
  if (dotPath === '.') return obj
  return dotPath.split('.').reduce((acc, key) => (acc == null ? undefined : acc[key]), obj)
}

function resolve(dotPath, context, root) {
  const value = getPath(context, dotPath)
  if (value === undefined && context !== root) return getPath(root, dotPath)
  return value
}

function isTruthy(value) {
  if (Array.isArray(value)) return value.length > 0
  if (typeof value === 'string') return value.trim().length > 0
  return Boolean(value)
}

function escapeLatex(value) {
  return String(value)
    .replace(/\\/g, '\\textbackslash{}')
    .replace(/([&%$#_{}])/g, '\\$1')
    .replace(/~/g, '\\textasciitilde{}')
    .replace(/\^/g, '\\textasciicircum{}')
}

function renderVar(expr, context, root) {
  const [rawVarPath, ...filters] = expr.split('|')
  const varPath = rawVarPath.trim()
  let value = resolve(varPath, context, root)
  let raw = false

  for (const filterExpr of filters) {
    const [rawName, ...argParts] = filterExpr.split(':')
    const name = rawName.trim()
    const arg = argParts.join(':')
    if (name === 'raw') raw = true
    else if (name === 'date') value = isTruthy(value) ? dayjs(value).format('MMM YYYY') : (arg ?? '')
    else if (name === 'join') value = Array.isArray(value) ? value.join(arg || ', ') : value
  }

  const str = value == null ? '' : String(value)
  return raw ? str : escapeLatex(str)
}

function render(nodes, context, root) {
  let out = ''
  for (const node of nodes) {
    if (node.type === 'text') out += node.value
    else if (node.type === 'var') out += renderVar(node.expr, context, root)
    else if (node.type === 'if') {
      if (isTruthy(resolve(node.path, context, root))) out += render(node.children, context, root)
    } else if (node.type === 'for') {
      const items = resolve(node.path, context, root)
      if (Array.isArray(items)) for (const item of items) out += render(node.children, item, root)
    }
  }
  return out
}

const resume = JSON.parse(fs.readFileSync(RESUME_JSON, 'utf-8'))
const template = fs.readFileSync(TEMPLATE_TEX, 'utf-8')
const ast = parseTemplate(template)
const output = render(ast.children, resume, resume)

fs.writeFileSync(OUTPUT_TEX, output, 'utf-8')
console.log(`Wrote ${path.relative(process.cwd(), OUTPUT_TEX)}`)
