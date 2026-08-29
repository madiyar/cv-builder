# cv-builder

A resume site you own end to end: a `resume.json` file, a web page that
renders it, an online editor to update it, and a PDF that's always in
sync — all statically hosted, no backend, no database.

```
resume.json  ──edit via /admin (GitHub-authenticated)──►  git commit
     │
     ├──► React page (this site)            "the resume, online"
     └──► GitHub Actions: JSON → LaTeX → PDF "the resume, downloadable"
```

## Features

- **Resume page** — a clean, printable resume rendered from
  [`src/data/resume.json`](src/data/resume.json) (a subset of the
  [JSON Resume](https://jsonresume.org/schema) schema).
- **Online editor** (`/admin`) — a [Sveltia CMS](https://github.com/sveltia/sveltia-cms)
  form UI backed by your GitHub repo. Saving a change there is a real git
  commit. Only someone with push access to your repo can sign in and edit —
  there's no separate user database.
- **PDF pipeline** — every push that touches `resume.json` triggers a
  GitHub Action that turns it into a LaTeX resume and compiles it to
  `cv.pdf`, published on GitHub Pages at a stable URL.
- **Zero backend** — the whole thing is static files plus a GitHub Action.
  Hosting on Netlify gets you the GitHub OAuth handshake the editor needs
  for free (no server, no secrets to manage).

## Quickstart

1. **Use this template** (the green button on the repo page, or *"Use this
   template" → "Create a new repository"*) to get your own copy.
2. **Deploy it to [Netlify](https://netlify.com)**: "Add new site" → "Import
   an existing project" → pick your new repo. Netlify auto-detects the
   build command and publish directory from [`netlify.toml`](netlify.toml).
3. **Turn on the CMS backend**: in your Netlify site, go to
   *Site configuration → Access control → OAuth* and add a provider for
   GitHub (Netlify walks you through creating the GitHub OAuth app — this
   is what lets `/admin` authenticate you, with no server of your own).
4. **Point the editor at your repo**: edit `public/admin/config.yml` and
   replace `your-username/your-repo-name` with your actual `owner/repo`,
   then commit and push.
5. **Enable GitHub Pages** for your repo (Settings → Pages → deploy from
   the `gh-pages` branch — it's created automatically the first time the
   PDF workflow runs) and update the target URL in [`netlify.toml`](netlify.toml)'s
   `/cv.pdf` redirect to match.

That's it. Your resume is live at your Netlify URL, editable at
`/admin`, and downloadable at `/cv.pdf`.

## Editing your resume

- **Online**: go to `/admin` on your deployed site, sign in with GitHub,
  edit the form, save. This commits straight to `src/data/resume.json`.
- **Locally**: edit [`src/data/resume.json`](src/data/resume.json) by hand
  and push — same result, no CMS needed.

Either way, the push triggers the PDF workflow automatically.

## Local development

```bash
npm install
npm run dev        # resume page at http://localhost:5173
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
  If you add a field there, add it to `src/data/resume.json`, the CMS
  fields in `public/admin/config.yml`, the React sections in
  [`src/App.tsx`](src/App.tsx), and `resume/template.tex` if it should
  appear in the PDF too.
- **Web design** — plain React + Tailwind in `src/App.tsx`.
- **PDF design** — [`resume/template.tex`](resume/template.tex), rendered
  by the small template engine in [`resume/build.mjs`](resume/build.mjs)
  (`%for x%…%endfor%` loops, `%if x%…%endif%` conditionals, `%{path}%`
  interpolation — see the comment at the top of that file for the full
  syntax).

## Why no backend?

Every piece of state — the resume data, the generated PDF, who's allowed
to edit — already lives in your GitHub repo and its permissions. Adding a
server or database on top would just be a slower, less secure copy of
information git already tracks.
