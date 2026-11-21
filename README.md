# Switchboard Evolution: the landing page

The page at **https://vivi7.github.io/switchboard-evolution-site/**, for [Switchboard Evolution](https://github.com/vivi7/switchboard-evolution): what the app is, its downloads, and every release.

It is a static page with no build step: `index.html`, `styles.css`, `main.js`, `404.html` and `assets/`.

## Releases and downloads

Nothing about a release is written in the page. `main.js` reads the published releases of vivi7/switchboard-evolution from GitHub's API when the page opens, sorts their files by system (macOS, Windows, Linux, Android) from their names, and fills the download button, the downloads and the list of releases. Publishing a release on GitHub is enough to put it on the page; drafts never show.

When GitHub's API does not answer (it allows 60 requests an hour to each visitor), the page falls back on `releases.json`, which the Pages workflow writes before each deploy and once a day with `scripts/releases.mjs`.

## Look at it locally

```bash
GH_TOKEN=$(gh auth token) node scripts/releases.mjs --include-drafts   # the releases, drafts too
python3 -m http.server 8765 --bind 127.0.0.1                            # then open http://127.0.0.1:8765/
```

On `localhost` the page reads `releases.json` only, so a draft release can be seen before it is published. A draft shows with a Draft tag.

## Publishing

`.github/workflows/pages.yml` deploys on every push to `main`, once a day, and by hand from the Actions tab. It copies only what the page serves into `_site`.

One-time setup: Settings › Pages › Build and deployment › Source: **GitHub Actions**.

## Rules

- Everything here is public. The screenshots show made-up demo projects only (the app's `tools/demo` home); never a real project name, path, host name or address.
- The fonts (Big Shoulders Display and Stencil, Barlow, JetBrains Mono) are served from `assets/fonts`, under the SIL Open Font License (the `OFL-*.txt` files), so no visitor request goes to a font service.
- Each image in `assets/` carries a note of where it comes from: inside the PNGs, and in a `.json` file beside each WebP.
