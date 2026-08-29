# cv-builder

A resume site you own end to end: a `resume.json` file, a web page that
renders it, an online editor to update it, and a PDF that's always in
sync — all statically hosted, no backend, no database.

```
resume.json  ──edit via /admin (your GitHub token, in your browser)──►  git commit
     │
     ├──► React page (this site)            "the resume, online"
     └──► GitHub Actions: JSON → LaTeX → PDF "the resume, downloadable"
```

## Features

- **Resume page** — a clean, printable resume rendered from
  [`src/data/resume.json`](src/data/resume.json) (a subset of the
  [JSON Resume](https://jsonresume.org/schema) schema).
- **Online editor** (`/admin`) — a small custom React form for the resume
  schema. You sign in with a GitHub personal access token scoped to just
  your repo; saving calls the GitHub Contents API directly from the
  browser and makes a real commit. No OAuth app, no relay server, no
  third-party CMS script — just your token, kept in your browser.
- **PDF pipeline** — every push that touches `resume.json` triggers a
  GitHub Action that turns it into a LaTeX resume and compiles it to
  `cv.pdf`, published on GitHub Pages at a stable URL.
- **Zero backend** — the whole thing is static files plus a GitHub Action.
  `api.github.com` supports CORS for authenticated requests, so the
  browser can talk to it directly; nothing else to host or maintain.

## Quickstart

1. **Use this template** (the green button on the repo page, or *"Use this
   template" → "Create a new repository"*) to get your own copy.
2. **Point the editor at your repo**: edit
   [`src/data/admin.config.json`](src/data/admin.config.json) —
   set `owner`/`repo` to your new repo, and `branch` if it's not `main`.
   Commit and push.
3. **Deploy it** to any static host (Netlify, Vercel, GitHub Pages, Cloudflare
   Pages…). On Netlify: "Add new site" → "Import an existing project" →
   pick your repo; the build command and publish directory are already set
   in [`netlify.toml`](netlify.toml).
4. **Enable GitHub Pages** for your repo (Settings → Pages → deploy from
   the `gh-pages` branch — it's created automatically the first time the
   PDF workflow runs) and update the target URL in `netlify.toml`'s
   `/cv.pdf` redirect to match.

That's it. Your resume is live at your host's URL, editable at `/admin`,
and downloadable at `/cv.pdf`.

## Editing your resume

- **Online**: go to `/admin` on your deployed site. The first time, create
  a [fine-grained personal access token](https://github.com/settings/personal-access-tokens/new)
  scoped to *only* your resume repo, with repository permission
  **Contents: Read and write** — the page links you straight there and
  tells you what to pick. Paste it in, edit the form, hit **Save to
  GitHub**. The token stays in `localStorage` in your browser; it's never
  sent anywhere but `api.github.com`.
- **Locally**: edit [`src/data/resume.json`](src/data/resume.json) by hand
  and push — same result, no admin UI needed.

Either way, the push triggers the PDF workflow automatically.

## Local development

```bash
npm install
npm run dev        # resume page at http://localhost:5173, editor at /admin/
```

To preview the generated LaTeX without waiting for CI:

```bash
npm run resume:build   # writes resume/resume.tex from src/data/resume.json
```

Compiling that to a PDF locally requires a LaTeX distribution (e.g.
`pdflatex` from TeX Live); CI uses the
[`xu-cheng/latex-action`](https://github.com/xu-cheng/latex-action) Docker
image so you don't need one installed to just use the template.

## Customizing

- **Resume fields** — the schema lives in [`src/types/resume.ts`](src/types/resume.ts).
  If you add a field there, add it to `src/data/resume.json`, a matching
  input in the relevant `admin/components/*Form.tsx`, the React sections in
  [`src/App.tsx`](src/App.tsx), and `resume/template.tex` if it should
  appear in the PDF too.
- **Web design** — plain React + Tailwind in `src/App.tsx`.
- **Admin UI** — plain React + Tailwind under [`admin/`](admin), a
  separate Vite entry point from the resume page (see `admin/AdminApp.tsx`
  and `admin/lib/github.ts` for the GitHub Contents API calls).
- **PDF design** — [`resume/template.tex`](resume/template.tex), rendered
  by the small template engine in [`resume/build.mjs`](resume/build.mjs)
  (`%for x%…%endfor%` loops, `%if x%…%endif%` conditionals, `%{path}%`
  interpolation — see the comment at the top of that file for the full
  syntax).

## Why no backend?

Every piece of state — the resume data, the generated PDF, who's allowed
to edit — already lives in your GitHub repo and its permissions. A
fine-grained personal access token scoped to one repo *is* that
permission model, so the browser can talk to `api.github.com` directly
with no OAuth app or relay server standing in between. Adding a server or
database on top would just be a slower, less secure copy of information
git already tracks.
