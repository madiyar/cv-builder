// A minimal GitHub Contents API client. Calls api.github.com directly from
// the browser with a user-supplied fine-grained personal access token — no
// OAuth app, no relay server. api.github.com sends CORS headers for
// authenticated requests, which is what makes this possible.

import { base64ToUtf8, utf8ToBase64 } from './base64'

const API_BASE = 'https://api.github.com'

export class GitHubApiError extends Error {
  status: number
  constructor(status: number, message: string) {
    super(message)
    this.status = status
  }
}

async function request<T>(token: string, path: string, init: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      ...(init.body ? { 'Content-Type': 'application/json' } : {}),
      ...init.headers,
    },
  })

  if (!res.ok) {
    const body = await res.json().catch(() => null)
    throw new GitHubApiError(res.status, body?.message ?? `GitHub API request failed (${res.status})`)
  }

  return res.json() as Promise<T>
}

export function checkRepoAccess(token: string, owner: string, repo: string) {
  return request(token, `/repos/${owner}/${repo}`)
}

export async function getFile(token: string, owner: string, repo: string, path: string, ref: string) {
  const data = await request<{ content: string; sha: string }>(
    token,
    `/repos/${owner}/${repo}/contents/${path}?ref=${encodeURIComponent(ref)}`,
  )
  return { content: base64ToUtf8(data.content), sha: data.sha }
}

export async function putFile(
  token: string,
  owner: string,
  repo: string,
  path: string,
  options: { content: string; sha: string; branch: string; message: string },
) {
  return request<{ content: { sha: string; html_url: string } }>(
    token,
    `/repos/${owner}/${repo}/contents/${path}`,
    {
      method: 'PUT',
      body: JSON.stringify({
        message: options.message,
        content: utf8ToBase64(options.content),
        sha: options.sha,
        branch: options.branch,
      }),
    },
  )
}
