#!/usr/bin/env node
// Write releases.json: the published GitHub releases of Switchboard Evolution,
// with their downloads. The page reads the releases live from GitHub; this
// file is its fallback, for when GitHub's API does not answer (it allows 60
// requests an hour to each visitor). The Pages workflow writes it before each
// deploy and once a day.
//
//   node scripts/releases.mjs                  write releases.json
//   node scripts/releases.mjs --include-drafts also draft releases, for a local
//                                              preview (needs a token that can
//                                              see them: GH_TOKEN=$(gh auth token))
//
// GITHUB_TOKEN or GH_TOKEN, when set, is sent with the request. RELEASES_REPO
// picks another repository (default vivi7/switchboard-evolution).

import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'releases.json');
const repo = process.env.RELEASES_REPO || 'vivi7/switchboard-evolution';
const includeDrafts = process.argv.includes('--include-drafts');
const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;

async function fetchReleases() {
  const releases = [];
  for (let page = 1; ; page++) {
    const res = await fetch(`https://api.github.com/repos/${repo}/releases?per_page=100&page=${page}`, {
      headers: {
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
        'User-Agent': 'switchboard-evolution-site',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    if (!res.ok) throw new Error(`GitHub answered ${res.status} for the releases of ${repo}: ${await res.text()}`);
    const batch = await res.json();
    releases.push(...batch);
    if (batch.length < 100) return releases;
  }
}

// The same fields the page takes from the live API, so both go through one path.
const releases = (await fetchReleases())
  .filter((r) => includeDrafts || !r.draft)
  .map((r) => ({
    tag_name: r.tag_name,
    name: r.name,
    html_url: r.html_url,
    draft: r.draft,
    prerelease: r.prerelease,
    published_at: r.published_at,
    created_at: r.created_at,
    assets: r.assets.map((a) => ({ name: a.name, size: a.size, browser_download_url: a.browser_download_url })),
  }));

writeFileSync(out, JSON.stringify({ repo, generated: new Date().toISOString(), releases }, null, 2) + '\n');
console.log(`releases.json: ${releases.length} release(s) of ${repo}${includeDrafts ? ', drafts included' : ''}`);
