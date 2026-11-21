// Switchboard Evolution, landing page: the live demo board, the downloads and
// the list of releases, read from GitHub.

(() => {
  'use strict';

  const REPO = 'vivi7/switchboard-evolution';
  const GITHUB = `https://github.com/${REPO}`;
  const API = `https://api.github.com/repos/${REPO}/releases?per_page=100`;
  // A local preview reads releases.json only (scripts/releases.mjs can put
  // drafts in it); the published page asks GitHub first.
  // ?live makes a local preview take the published path too, to check it.
  const LOCAL = ['localhost', '127.0.0.1', '[::1]', ''].includes(location.hostname)
    && !new URLSearchParams(location.search).has('live');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');

  /** A small element builder; text is always set as text. */
  function h(tag, attrs, ...children) {
    const el = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs || {})) {
      if (v == null || v === false) continue;
      if (k === 'class') el.className = v;
      else el.setAttribute(k, v === true ? '' : v);
    }
    for (const c of children.flat()) {
      if (c == null || c === false) continue;
      el.append(c instanceof Node ? c : document.createTextNode(String(c)));
    }
    return el;
  }

  function icon(name) {
    const ns = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('class', 'icon');
    svg.setAttribute('aria-hidden', 'true');
    const use = document.createElementNS(ns, 'use');
    use.setAttribute('href', `#i-${name}`);
    svg.append(use);
    return svg;
  }

  // ---------------------------------------------------------------- board

  function startBoard() {
    const board = document.querySelector('[data-board]');
    if (!board) return;
    const stations = [...board.querySelectorAll('.station')];
    const callCount = board.querySelector('[data-count="call"]');
    const runCount = board.querySelector('[data-count="run"]');
    const calling = stations.filter((s) => s.dataset.state === 'call');

    const setState = (st, state, text) => {
      st.dataset.state = state;
      st.querySelector('.st-status').replaceChildren(`${st.dataset.agent} · `, h('b', null, text));
      if (state === 'call') {
        st.classList.remove('is-igniting');
        void st.offsetWidth; // restart the animation
        st.classList.add('is-igniting');
        st.querySelector('.lamp').addEventListener('animationend', () => st.classList.remove('is-igniting'), { once: true });
      }
    };
    const count = () => {
      const needs = stations.filter((s) => s.dataset.state === 'call' || s.dataset.state === 'stop').length;
      callCount.textContent = needs;
      callCount.toggleAttribute('data-zero', needs === 0);
      runCount.textContent = stations.filter((s) => s.dataset.state === 'run').length;
    };

    let recent = null;
    function tick() {
      // Answer the oldest call when two are waiting, or now and then; otherwise
      // a running session stops to ask for you.
      if (calling.length >= 2 || (calling.length && Math.random() < 0.4)) {
        const st = calling.shift();
        setState(st, 'run', 'Answered, running');
        recent = st;
      } else {
        const candidates = stations.filter((s) => s.dataset.state === 'run' && s !== recent && s.offsetParent);
        if (!candidates.length) return;
        const st = candidates[Math.floor(Math.random() * candidates.length)];
        setState(st, 'call', 'Waiting for you');
        calling.push(st);
      }
      count();
    }

    let timer = null;
    let visible = false;
    const run = () => {
      const should = visible && !document.hidden && !reducedMotion.matches;
      if (should && !timer) timer = setInterval(tick, 2800);
      if (!should && timer) { clearInterval(timer); timer = null; }
    };
    new IntersectionObserver(([e]) => { visible = e.isIntersecting; run(); }, { threshold: 0.2 }).observe(board);
    document.addEventListener('visibilitychange', run);
    reducedMotion.addEventListener?.('change', run);
  }

  // ---------------------------------------------------------------- releases

  // What each file of a release is, from its name (see the Release workflow
  // of the app's repository). The first match wins.
  const KINDS = [
    { re: /-arm64\.dmg$/i, os: 'mac', arch: 'arm', label: 'Apple silicon', type: 'dmg', main: true },
    { re: /-x64\.dmg$/i, os: 'mac', arch: 'x86', label: 'Intel', type: 'dmg', main: true },
    { re: /-arm64\.zip$/i, os: 'mac', arch: 'arm', label: 'Apple silicon', type: 'zip' },
    { re: /-x64\.zip$/i, os: 'mac', arch: 'x86', label: 'Intel', type: 'zip' },
    { re: /-x64\.exe$/i, os: 'windows', arch: 'x86', label: 'x64', type: 'exe', main: true },
    { re: /-arm64\.exe$/i, os: 'windows', arch: 'arm', label: 'Arm64', type: 'exe', main: true },
    { re: /\.exe$/i, os: 'windows', label: 'x64 and Arm64 in one', type: 'exe' },
    { re: /\.AppImage$/i, os: 'linux', arch: 'x86', label: 'x64', type: 'AppImage', main: true },
    { re: /\.deb$/i, os: 'linux', arch: 'x86', label: 'Debian, Ubuntu', type: 'deb' },
    { re: /\.pacman$/i, os: 'linux', arch: 'x86', label: 'Arch', type: 'pacman' },
    { re: /\.apk$/i, os: 'android', arch: 'arm', label: 'Phone app', type: 'APK', main: true },
  ];
  // The build to put first when the visitor's own architecture is not known.
  const DEFAULT_ARCH = { mac: 'arm', windows: 'x86', linux: 'x86', android: 'arm' };
  const PLATFORMS = [
    { os: 'mac', name: 'macOS', foot: 'Signed ad hoc, not notarized: see Install below.' },
    { os: 'windows', name: 'Windows', foot: 'Not signed: see Install below.' },
    { os: 'linux', name: 'Linux', foot: 'The AppImage runs on most distributions.' },
    { os: 'android', name: 'Android', foot: 'On iPhone you build the app from the source code: see Install below.' },
  ];

  function classify(asset) {
    const kind = KINDS.find((k) => k.re.test(asset.name));
    return kind ? { ...kind, name: asset.name, size: asset.size, url: asset.browser_download_url } : null;
  }

  const version = (r) => (r.tag_name || '').replace(/^v/, '');
  const when = (r) => r.published_at || r.created_at;
  const formatDate = (iso) =>
    new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  const formatSize = (bytes) =>
    bytes >= 1e9 ? `${(bytes / 1e9).toFixed(1)} GB` : `${Math.max(1, Math.round(bytes / 1e6))} MB`;

  async function getJSON(url) {
    // no-cache: revalidate, so a release published a minute ago is not hidden by a cached copy
    const res = await fetch(url, { cache: 'no-cache', headers: { Accept: 'application/vnd.github+json' } });
    if (!res.ok) throw new Error(`${url}: ${res.status}`);
    return res.json();
  }

  async function loadReleases() {
    const snapshot = async () => (await getJSON('releases.json')).releases;
    if (LOCAL) return snapshot();
    try {
      return (await getJSON(API)).filter((r) => !r.draft);
    } catch {
      return snapshot();
    }
  }

  async function detectSystem() {
    const ua = navigator.userAgent;
    const uad = navigator.userAgentData;
    const platform = (uad && uad.platform) || navigator.platform || '';
    let os = 'other';
    if (/android/i.test(ua)) os = 'android';
    else if (/iphone|ipad|ipod/i.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1)) os = 'ios';
    else if (/mac/i.test(platform) || /Macintosh/.test(ua)) os = 'mac';
    else if (/win/i.test(platform) || /Windows/.test(ua)) os = 'windows';
    else if (/linux|cros|x11/i.test(platform) || /Linux|X11|CrOS/.test(ua)) os = 'linux';

    let arch;
    if (uad && uad.getHighEntropyValues && (os === 'mac' || os === 'windows')) {
      try {
        const v = await uad.getHighEntropyValues(['architecture']);
        if (v.architecture === 'arm') arch = 'arm';
        else if (v.architecture === 'x86') arch = 'x86';
      } catch { /* not offered: keep the default below */ }
    }
    if (!arch && /arm64|aarch64/i.test(ua)) arch = 'arm';
    // Safari does not say: most Macs sold since 2020 are Apple silicon.
    if (!arch && os === 'mac') arch = 'arm';
    if (!arch) arch = 'x86';
    return { os, arch };
  }

  function pickMain(files, system) {
    const mains = files.filter((f) => f.os === system.os && f.main);
    return mains.find((f) => f.arch === system.arch) || mains[0] || null;
  }

  function renderPrimary(latest, files, system) {
    const plate = document.querySelector('[data-primary]');
    const main = document.querySelector('[data-primary-main]');
    const meta = document.querySelector('[data-primary-meta]');
    const alt = document.querySelector('[data-primary-alt]');
    if (!plate) return;

    if (!latest) {
      plate.href = GITHUB;
      main.textContent = 'Get it on GitHub';
      meta.textContent = 'The first release is on its way';
      return;
    }
    const v = version(latest);
    const file = pickMain(files, system);
    if (system.os === 'ios') {
      // No download for iPhone: the app is built from the source code.
      plate.href = '#iphone';
      main.textContent = 'Build the iPhone app';
      meta.textContent = 'From the source code, on a Mac with Xcode';
      return;
    }
    if (!file) {
      plate.href = '#download';
      main.textContent = 'Choose a download';
      meta.textContent = `v${v} for macOS, Windows, Linux and Android`;
      return;
    }
    const osName = PLATFORMS.find((p) => p.os === file.os).name;
    plate.href = file.url;
    main.textContent = file.os === 'android' ? 'Download the phone app' : `Download for ${osName}`;
    meta.textContent = `${file.os === 'android' ? 'Android APK' : file.label} · v${v} · ${formatSize(file.size)}`;

    // The other build of the same system, one step away.
    const other = files.find((f) => f.os === file.os && f.main && f !== file);
    if (other) {
      alt.replaceChildren(h('a', { href: other.url }, file.os === 'mac' ? `${other.label} Mac` : `${osName} ${other.label}`));
      alt.hidden = false;
    }
  }

  function renderPlatforms(latest, files, system) {
    const box = document.querySelector('[data-platforms]');
    const line = document.querySelector('[data-release-line]');
    if (!box) return;
    if (!latest) {
      line.textContent = 'No release is published yet.';
      box.replaceChildren(
        h('p', { class: 'platforms-note' }, 'The first release is on its way. Until then, the ',
          h('a', { href: `${GITHUB}#build-and-run` }, 'README'), ' explains how to build it yourself.'),
      );
      return;
    }
    // replaceChildren would print a null as text: only nodes and strings go in.
    line.replaceChildren(...[
      `Version ${version(latest)} · ${formatDate(when(latest))} · `,
      h('a', { href: latest.html_url }, 'Release notes'),
      latest.draft ? h('span', { class: 'tag tag--draft' }, 'Draft') : null,
    ].filter(Boolean));
    const mine = pickMain(files, system);
    const plates = PLATFORMS.map((p) => {
      const yours = system.os === p.os;
      const arch = yours ? system.arch : DEFAULT_ARCH[p.os];
      const list = files
        .filter((f) => f.os === p.os)
        .sort((a, b) => (!!b.main - !!a.main) || ((b.arch === arch) - (a.arch === arch)));
      if (!list.length) return null;
      return h('article', { class: `plate-os${yours ? ' is-yours' : ''}` },
        h('div', { class: 'plate-os-head' },
          h('h3', null, p.name),
          h('span', { class: 'yours' }, yours ? 'Your system' : null, h('span', { class: 'lamp', 'aria-hidden': 'true' })),
        ),
        h('ul', { class: 'files' },
          list.map((f) => {
            const a = h('a', { class: `file${f === mine ? ' is-main' : ''}`, href: f.url, title: f.name },
              h('span', null, h('span', { class: 'file-label' }, f.label), h('span', { class: 'file-type' }, f.type)),
              h('span', { class: 'file-size' }, formatSize(f.size)),
            );
            a.append(icon('down'));
            return h('li', null, a);
          }),
        ),
        h('p', { class: 'plate-os-foot' }, p.foot),
      );
    }).filter(Boolean);
    box.replaceChildren(...plates.filter(Boolean));
  }

  function renderReleases(releases, latest) {
    const list = document.querySelector('[data-releases]');
    if (!list) return;
    if (!releases.length) {
      list.replaceChildren(h('li', { class: 'release release--note' }, 'No release is published yet. ',
        h('a', { href: `${GITHUB}/releases` }, 'Releases on GitHub')));
      return;
    }
    list.replaceChildren(...releases.map((r) => {
      const isLatest = r === latest;
      const total = r.assets.reduce((n, a) => n + a.size, 0);
      return h('li', { class: `release${isLatest ? ' is-latest' : ''}` },
        h('span', { class: `rel-version${version(r).length > 6 ? ' rel-version--long' : ''}` }, version(r)),
        h('div', { class: 'rel-body' },
          h('p', { class: 'rel-name' },
            h('a', { href: r.html_url }, r.name || r.tag_name),
            isLatest ? h('span', { class: 'tag tag--latest' }, 'Latest') : null,
            r.prerelease ? h('span', { class: 'tag tag--pre' }, 'Pre-release') : null,
            r.draft ? h('span', { class: 'tag tag--draft' }, 'Draft') : null,
          ),
          h('p', { class: 'rel-meta' },
            h('time', { datetime: when(r) }, formatDate(when(r))),
            r.assets.length ? ` · ${r.assets.length} files · ${formatSize(total)}` : ' · no files',
          ),
          r.assets.length
            ? h('details', { class: 'rel-files' },
                h('summary', null, icon('chevron'), 'Files'),
                h('ul', null, r.assets.map((a) =>
                  h('li', null, h('a', { href: a.browser_download_url },
                    h('span', null, a.name), h('span', null, formatSize(a.size))))),
                ),
              )
            : null,
        ),
        h('span', { class: 'lamp', 'aria-hidden': 'true' }),
      );
    }));
  }

  function renderFailure() {
    const box = document.querySelector('[data-platforms]');
    if (box) {
      box.replaceChildren(h('p', { class: 'platforms-note' },
        'GitHub did not answer, so the downloads cannot be listed here. They are all on the ',
        h('a', { href: `${GITHUB}/releases/latest` }, 'latest release on GitHub'), '.'));
    }
  }

  async function startReleases() {
    const system = await detectSystem();
    let releases;
    try {
      releases = await loadReleases();
    } catch {
      renderFailure();
      return;
    }
    releases.sort((a, b) => new Date(when(b)) - new Date(when(a)));
    const latest = releases.find((r) => !r.prerelease) || releases[0] || null;
    const files = latest ? latest.assets.map(classify).filter(Boolean) : [];
    renderPrimary(latest, files, system);
    renderPlatforms(latest, files, system);
    renderReleases(releases, latest);
  }

  // ---------------------------------------------------------------- copy

  function startCopy() {
    document.addEventListener('click', async (e) => {
      const button = e.target.closest('[data-copy]');
      if (!button) return;
      const code = button.parentElement.querySelector('code');
      const label = button.querySelector('span');
      const use = button.querySelector('use');
      try {
        await navigator.clipboard.writeText(code.textContent);
        label.textContent = 'Copied';
        use.setAttribute('href', '#i-check');
      } catch {
        label.textContent = 'Select and copy';
      }
      clearTimeout(button._reset);
      button._reset = setTimeout(() => {
        label.textContent = 'Copy';
        use.setAttribute('href', '#i-copy');
      }, 1800);
    });
  }

  // ---------------------------------------------------------------- views

  // The desktop views: one tab per station, arrow keys move between them.
  function startViews() {
    const tabs = [...document.querySelectorAll('.sel[role="tab"]')];
    if (!tabs.length) return;
    const panel = (tab) => document.getElementById(tab.getAttribute('aria-controls'));
    const select = (tab, focus) => {
      for (const t of tabs) {
        const on = t === tab;
        t.setAttribute('aria-selected', String(on));
        t.tabIndex = on ? 0 : -1;
        panel(t).hidden = !on;
      }
      const img = panel(tab).querySelector('img');
      if (img) img.loading = 'eager';
      if (focus) tab.focus({ preventScroll: true });
      // On a narrow screen the plates scroll sideways: bring the chosen one,
      // and its lamp, fully into view without moving the page.
      const row = tab.parentElement;
      const r = row.getBoundingClientRect();
      const t = tab.getBoundingClientRect();
      if (t.left < r.left || t.right > r.right) {
        row.scrollBy({ left: t.left - r.left - 8, behavior: reducedMotion.matches ? 'auto' : 'smooth' });
      }
    };
    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => select(tab, false));
      tab.addEventListener('keydown', (e) => {
        const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
        if (step) select(tabs[(i + step + tabs.length) % tabs.length], true);
        else if (e.key === 'Home') select(tabs[0], true);
        else if (e.key === 'End') select(tabs[tabs.length - 1], true);
        else return;
        e.preventDefault();
      });
    });
    select(tabs.find((t) => t.getAttribute('aria-selected') === 'true') || tabs[0], false);
  }

  startBoard();
  startReleases();
  startCopy();
  startViews();
})();
