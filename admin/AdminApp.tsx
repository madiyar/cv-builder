import { useEffect, useState, type FormEvent } from 'react'
import adminConfig from '../src/data/admin.config.json'
import type { Resume } from '../src/types/resume'
import { ResumeForm } from './components/ResumeForm'
import { clearToken, loadToken, saveToken } from './lib/auth'
import { checkRepoAccess, getFile, GitHubApiError, putFile } from './lib/github'

type Status = { kind: 'idle' } | { kind: 'saving' } | { kind: 'success'; url: string } | { kind: 'error'; message: string }

function SignIn({ onSignedIn }: { onSignedIn: (token: string) => void }) {
  const [token, setToken] = useState('')
  const [checking, setChecking] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const tokenSettingsUrl = 'https://github.com/settings/personal-access-tokens/new'

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setChecking(true)
    setError(null)
    try {
      await checkRepoAccess(token.trim(), adminConfig.owner, adminConfig.repo)
      saveToken(token.trim())
      onSignedIn(token.trim())
    } catch (err) {
      setError(err instanceof GitHubApiError ? err.message : 'Could not reach GitHub.')
    } finally {
      setChecking(false)
    }
  }

  return (
    <div className="mx-auto max-w-md py-16">
      <h1 className="text-xl font-semibold text-slate-900">Sign in to edit your resume</h1>
      <p className="mt-2 text-sm text-slate-600">
        Create a{' '}
        <a href={tokenSettingsUrl} target="_blank" rel="noreferrer" className="underline">
          fine-grained personal access token
        </a>{' '}
        scoped only to{' '}
        <code className="rounded bg-slate-100 px-1 py-0.5">
          {adminConfig.owner}/{adminConfig.repo}
        </code>
        , with repository permission <strong>Contents: Read and write</strong>. It's stored only in this browser.
      </p>
      <form onSubmit={handleSubmit} className="mt-4 space-y-3">
        <input
          type="password"
          autoComplete="off"
          spellCheck={false}
          placeholder="github_pat_..."
          value={token}
          onChange={(e) => setToken(e.target.value)}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={!token || checking}
          className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700 disabled:opacity-50"
        >
          {checking ? 'Checking…' : 'Sign in'}
        </button>
      </form>
    </div>
  )
}

function Editor({ token, onSignOut }: { token: string; onSignOut: () => void }) {
  const [resume, setResume] = useState<Resume | null>(null)
  const [sha, setSha] = useState<string | null>(null)
  const [status, setStatus] = useState<Status>({ kind: 'idle' })
  const [loadError, setLoadError] = useState<string | null>(null)

  async function load() {
    setLoadError(null)
    setResume(null)
    try {
      const file = await getFile(token, adminConfig.owner, adminConfig.repo, adminConfig.resumePath, adminConfig.branch)
      setResume(JSON.parse(file.content))
      setSha(file.sha)
    } catch (err) {
      setLoadError(err instanceof GitHubApiError ? err.message : 'Could not load resume.json.')
    }
  }

  useEffect(() => {
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function handleSave() {
    if (!resume || !sha) return
    setStatus({ kind: 'saving' })
    try {
      const result = await putFile(token, adminConfig.owner, adminConfig.repo, adminConfig.resumePath, {
        content: `${JSON.stringify(resume, null, 2)}\n`,
        sha,
        branch: adminConfig.branch,
        message: 'Update resume via admin',
      })
      setSha(result.content.sha)
      setStatus({ kind: 'success', url: result.content.html_url })
    } catch (err) {
      if (err instanceof GitHubApiError && err.status === 409) {
        setStatus({ kind: 'error', message: 'This file changed on GitHub since you loaded it. Reload and reapply your edits.' })
      } else {
        setStatus({ kind: 'error', message: err instanceof GitHubApiError ? err.message : 'Save failed.' })
      }
    }
  }

  return (
    <div className="mx-auto max-w-3xl py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">Edit resume</h1>
          <p className="text-sm text-slate-500">
            {adminConfig.owner}/{adminConfig.repo} @ {adminConfig.branch}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {status.kind === 'success' && (
            <a href={status.url} target="_blank" rel="noreferrer" className="text-sm text-green-700 underline">
              Saved — view commit
            </a>
          )}
          {status.kind === 'error' && <p className="max-w-xs text-sm text-red-600">{status.message}</p>}
          <button
            type="button"
            onClick={handleSave}
            disabled={!resume || status.kind === 'saving'}
            className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700 disabled:opacity-50"
          >
            {status.kind === 'saving' ? 'Saving…' : 'Save to GitHub'}
          </button>
          <button
            type="button"
            onClick={() => {
              onSignOut()
            }}
            className="text-sm text-slate-500 underline"
          >
            Sign out
          </button>
        </div>
      </div>

      {loadError && (
        <div className="rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {loadError}{' '}
          <button type="button" onClick={load} className="underline">
            Retry
          </button>
        </div>
      )}
      {!loadError && !resume && <p className="text-sm text-slate-500">Loading resume.json…</p>}
      {resume && <ResumeForm resume={resume} onChange={setResume} />}
    </div>
  )
}

export function AdminApp() {
  const [token, setToken] = useState<string | null>(() => loadToken())

  return (
    <div className="min-h-screen bg-slate-50 px-4">
      {token ? (
        <Editor
          token={token}
          onSignOut={() => {
            clearToken()
            setToken(null)
          }}
        />
      ) : (
        <SignIn onSignedIn={setToken} />
      )}
    </div>
  )
}
