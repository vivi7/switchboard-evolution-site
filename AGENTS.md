# Switchboard Evolution: the landing page

The public landing page of Switchboard Evolution (the app lives in vivi7/switchboard-evolution), published with GitHub Pages at https://vivi7.github.io/switchboard-evolution/ by the Pages workflow of vivi7/switchboard-evolution. Read README.md first: it says how the page gets its releases, how to look at it locally and how it is deployed.

- Static files, no build: keep it that way. No framework, no external scripts, fonts served from `assets/fonts`.
- Releases are never written into the page by hand: `main.js` reads them from GitHub.
- Everything is public: screenshots show made-up demo projects only; no real project names, paths, host names, addresses or personal data.
- Copy states only what the app does (its README and PRODUCT.md are the source). No invented users, numbers or quotes.
- Before saying a change is done, look at the page at 1440 and 390 px wide with a local server.
- A push to `main` does not publish the page: after pushing, run `gh workflow run pages.yml -R vivi7/switchboard-evolution` and check the page online.
