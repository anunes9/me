# André Nunes — personal site

Source for [anunes9.github.io/me](https://anunes9.github.io/me/), a one-page site built with [Astro](https://astro.build) and plain CSS, deployed as a GitHub Pages project site under the `/me/` base path. Source lives on `master`; the built output is pushed to the `gh-pages` branch.

Design and content decisions are recorded in `docs/superpowers/specs/2026-10-25-cv-site-redesign-design.md`.

## Commands

```bash
npm install        # install dependencies (Node 24, see .tool-versions)
npm run dev        # local dev server at http://localhost:4321/me/
npm run check      # production build, then the tests in tests/
npm run deploy     # build and push dist/ to the gh-pages branch
```

All page copy lives in `src/data/profile.ts`.
