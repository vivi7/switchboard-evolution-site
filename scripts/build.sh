#!/bin/sh
# Puts the page together in _site, as GitHub Pages serves it.
#
# The Pages workflow of vivi7/switchboard-evolution runs this after checking
# out this repository, so the page lives at that repository's address
# (https://vivi7.github.io/switchboard-evolution/). It writes releases.json,
# the copy of the releases the page falls back on when GitHub's API does not
# answer, then copies only what the page serves: no scripts, no notes.
set -eu
cd "$(dirname "$0")/.."

node scripts/releases.mjs

rm -rf _site
mkdir _site
cp -R index.html styles.css main.js releases.json 404.html assets _site/
# the images' provenance notes stay in the repository
find _site/assets -name '*.json' -delete
