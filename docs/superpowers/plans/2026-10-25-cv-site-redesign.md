# CV Site Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Create React App résumé page with a static Astro one-pager that implements the approved editorial bento design and copy, deploying to GitHub Pages at `/me/`.

**Architecture:** One Astro route renders a dozen small `.astro` components from a single typed data module (`src/data/profile.ts`). Plain CSS with custom properties in one global stylesheet plus component-scoped styles; fonts self-hosted via Fontsource; images through `astro:assets`. Three tiny scripts (theme init/toggle, Lisbon clock, copy email) are the only JavaScript. Verification is `npm run build` followed by `node --test` assertions over `dist/index.html`, plus browser checks at 375/768/1280.

**Tech Stack:** Astro 7.4.2, `@fontsource/inter` 5.x (static 400/500/600), `@fontsource/instrument-serif` 5.3.0, `gh-pages` 6.3.0, Node 24 (built-in test runner and type stripping), npm.

**Spec:** `docs/superpowers/specs/2026-10-25-cv-site-redesign-design.md` (visual reference: `docs/superpowers/specs/2026-10-25-cv-site-redesign-sketch/index.html`)

## Global Constraints

- Astro config: `site: 'https://anunes9.github.io'`, `base: '/me'`, static output. Internal URLs other than `#anchors` come from `import.meta.env.BASE_URL` via `withBase()`; never hard-code `/me/`.
- No runtime requests to Google Fonts or any third party. Fonts: static Inter 400/500/600 for UI/body, Instrument Serif 400 + 400 italic for display. No monospace face.
- All page copy is exactly spec §7 and lives only in `src/data/profile.ts`. No CV links anywhere. No phone number.
- Tokens, type sizes and breakpoints exactly as spec §6: labels never below 11px; breakpoints 480 / 860 / 1024; accent chips are ink on tint; dark cards `#17171a`.
- Light theme is the default for everyone; `prefers-color-scheme` is not consulted. Theme stored in `localStorage` key `theme`, applied before first paint, every storage access wrapped in try/catch.
- Heading outline: one `h1`; every card label is an `h2`; card titles are `h3`. One `<main>`, a skip link, `lang="en"`, visible `:focus-visible` ring (2px accent, 3px offset).
- Every external link (the three "Start a conversation" buttons, LinkedIn and GitHub in Connect, the four project cards): `target="_blank" rel="noopener noreferrer"` plus a visually hidden "(opens in new tab)" span inside the link.
- Commit after every task with a conventional-commit message ending in `Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>`. Work on `master`; never push or deploy unless the owner says so.
- Use `npm`, never `yarn`.

## Review Focus

1. A 375px-wide phone: the email in Connect and the long LinkedIn handle must wrap, not overflow; page `scrollWidth` must equal `innerWidth`. (Test added to Task 8.)
2. Clipboard API missing or denied (plain `http`, old browser, permission refused): the copy button must show the address itself instead of failing silently. (Test added to Task 6.)
3. JavaScript disabled or slow: the page must be fully readable, in light theme, with the clock showing `--:--` and the theme toggle harmless. (Test added to Task 3.)
4. `localStorage` throwing (private mode, blocked storage): the theme script must not throw and the page must render light. (Test added to Task 3.)
5. Base path: every asset, manifest, icon and image URL in `dist/index.html` must start with `/me/`; a root-relative `/favicon.ico` or `/_astro/` would 404 on GitHub Pages. (Test added to Task 1 and re-run by every later task.)

---

### Task 1: Astro scaffold, CRA removal, base-path test harness

**Files:**
- Create: `astro.config.mjs`, `tsconfig.json`, `src/pages/index.astro`, `src/env.d.ts`, `src/lib/url.ts`, `public/.nojekyll`, `.tool-versions` (`nodejs 24.6.0`), `tests/helpers.mjs`, `tests/url.test.mjs`, `tests/dist.test.mjs`, `README.md` (replace), `.claude/launch.json` (replace)
- Modify: `package.json` (rewrite), `.gitignore` (add `dist/`, `.astro/`), `public/manifest.json`
- Delete: `src/App.js`, `src/index.js`, `src/index.css`, `src/reportWebVitals.js`, `src/mantine/`, `src/resume-pdf/`, `src/assets/logo.svg`, `src/assets/logo-black.svg`, `src/assets/picture.jpeg`, `src/.DS_Store`, `public/index.html`, `build/`, `yarn.lock`, `package-lock.json` (regenerated), `.DS_Store`

**Interfaces:**
- Produces: `withBase(path: string): string` in `src/lib/url.ts`, built on pure `joinBase(base: string, path: string): string` which returns `base` without trailing slash + `/` + `path` without leading slash (so `joinBase('/me/', 'og.jpg')` → `/me/og.jpg`, `joinBase('/me', '/og.jpg')` → `/me/og.jpg`, `joinBase('/', 'x')` → `/x`).
- Produces: `tests/helpers.mjs` exporting `readDist(): string` (reads `dist/index.html`, throws a clear error telling the runner to `npm run build` first), `readDistStyles(): string` (every `<style>` block in `dist/index.html` concatenated with every `dist/_astro/*.css` file, so CSS assertions work whether Astro inlines or links styles) and `count(html: string, needle: string): number`.
- Produces npm scripts: `dev` (`astro dev`), `build` (`astro build`), `preview`, `test` (`node --test tests/`), `check` (`npm run build && npm test`), `predeploy` (`npm run build`), `deploy` (`gh-pages -d dist --dotfiles`).

- [ ] **Step 1: Write the failing unit test for `joinBase`**

```js
// tests/url.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import { joinBase } from '../src/lib/url.ts';

test('joinBase normalises slashes', () => {
  assert.equal(joinBase('/me/', 'og.jpg'), '/me/og.jpg');
  assert.equal(joinBase('/me', '/og.jpg'), '/me/og.jpg');
  assert.equal(joinBase('/', 'x'), '/x');
  assert.equal(joinBase('/me', ''), '/me/');
});
```

- [ ] **Step 2: Write the failing dist test**

```js
// tests/dist.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import { readDist, readDistStyles, count } from './helpers.mjs';

test('dist is a single English page under /me/', () => {
  const html = readDist();
  assert.match(html, /<html lang="en"/);
  assert.match(html, /<main[\s>]/);
  assert.ok(!/(href|src)="\/(?!me\/)[a-z_]/.test(html), 'root-relative URL outside /me/ found');
  assert.ok(!html.includes('fonts.googleapis.com'));
  assert.match(html, /<link rel="manifest" href="\/me\/manifest\.json"/);
});
```

- [ ] **Step 3: Run both tests to verify they fail**

Run: `node --test tests/`
Expected: FAIL (`Cannot find module '../src/lib/url.ts'`; `dist/index.html` missing).

- [ ] **Step 4: Rewrite `package.json`**

Name `me`, `"private": true`, `"type": "module"`, `"engines": { "node": ">=22.23.4" }`, remove `homepage`, `eslintConfig`, `browserslist`. Dependencies: `astro@^7.4.2`, `sharp@^0.35.5` (image optimisation for `astro:assets`), `@fontsource/inter@^5.2.0`, `@fontsource/instrument-serif@^5.3.0`. DevDependencies: `gh-pages@^6.3.0`. Scripts as in Interfaces. Then delete `yarn.lock`, `package-lock.json`, `node_modules` and run `npm install`.

- [ ] **Step 5: Delete CRA files and the old résumé**

Remove every path in the Delete list. Add `dist/` and `.astro/` to `.gitignore`.

- [ ] **Step 6: Create `astro.config.mjs`, `tsconfig.json`, `src/env.d.ts`**

Config: `defineConfig({ site: 'https://anunes9.github.io', base: '/me' })`. tsconfig extends `astro/tsconfigs/strict` with `include: ["src/**/*", ".astro/types.d.ts"]`. `src/env.d.ts` contains `/// <reference types="astro/client" />`.

- [ ] **Step 7: Implement `joinBase` and `withBase` in `src/lib/url.ts`**

`withBase(path)` calls `joinBase(import.meta.env.BASE_URL, path)`.

- [ ] **Step 8: Fix `public/manifest.json`, add `public/.nojekyll`**

Icon `src` values become `android-chrome-192x192.png` and `android-chrome-512x512.png` (relative, no leading slash); `start_url` becomes `.`; `name` "André Nunes", `short_name` "André". `.nojekyll` is an empty file.

- [ ] **Step 9: Create the placeholder page `src/pages/index.astro`**

Frontmatter imports `withBase`. Body: `<!doctype html><html lang="en"><head>` with charset, viewport, `<title>André Nunes — Team Leader, AI-first projects</title>`, `<link rel="icon" href={withBase('favicon.ico')}>`, `<link rel="manifest" href={withBase('manifest.json')}>`; `<body><main><h1>André Nunes</h1></main></body>`. (Task 2 replaces this with the real layout; this task only proves the toolchain and base path.)

- [ ] **Step 10: Write `tests/helpers.mjs`**

`readDist()` reads `dist/index.html` relative to the repo root with `node:fs`; on `ENOENT` throw `new Error('dist/index.html not found: run `npm run build` first')`. `readDistStyles()` extracts `<style>[\s\S]*?</style>` contents from the HTML and appends the contents of every `.css` file under `dist/_astro/`. `count(html, needle)` returns `html.split(needle).length - 1`.

- [ ] **Step 11: Build and run the tests**

Run: `npm run check`
Expected: build succeeds, `2 pass`.

- [ ] **Step 12: Replace `README.md` and `.claude/launch.json`**

README: one paragraph (what the site is, Astro, GitHub Pages at `/me/`), then `npm install`, `npm run dev`, `npm run check`, `npm run deploy` with one line each, and a pointer to the spec. `launch.json` configuration `start`: `runtimeExecutable` `npm`, `runtimeArgs` `["run","dev","--","--port","4321"]`, `port` 4321.

- [ ] **Step 13: Commit**

```bash
git add -A
git commit -m "chore: replace Create React App with an Astro scaffold

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 2: Content data module

**Files:**
- Create: `src/data/profile.ts`, `tests/profile.test.mjs`
- Copy: `docs/superpowers/specs/2026-10-25-cv-site-redesign-sketch/photo.jpg` → `src/assets/photo.jpg`; `shot-fran.jpg`, `shot-bluesoul.jpg`, `shot-espinhal.jpg`, `shot-trt.png` → `src/assets/projects/`

**Interfaces:**
- Produces, all exported from `src/data/profile.ts` as `const` objects with these shapes (TypeScript interfaces of the same names live in the file):
  - `links: { linkedin: string; github: string; email: string }`
  - `nav: { items: { label: string; href: string }[]; cta: { label: string; href: string } }` (items Work `#work`, Experience `#experience`, About `#about`; cta "Start a conversation" → LinkedIn)
  - `hero: { headlineLead: string; headlineAccent: string; lede: string; primary: {label; href}; secondary: {label; href}; byline: string; cv?: {label; href} }` (`cv` absent; byline "Team Leader at Runtime Revolution · Lisbon, Portugal")
  - `careerStart: 2018` and `strip(now: Date): { key: string; value: string; support: string }[]` (a function of the build date returning 3 entries: `Track record` / `${now.getFullYear() - careerStart} years` / `Shipping web and mobile since 2018`; `Industries` / `Healthcare · Automotive · Travel` / `From medical records to vehicle production`; `On the side` / `${projects.items.length} live sites` / `Built for real small businesses`)
  - `aiWork: { title: string; intro: string; items: { title: string; line: string }[] }` (4 items)
  - `about: { title: string; body: string; aside: string }`
  - `basedIn: { title: string; body: string; clockLabel: 'Lisbon time'; timeZone: 'Europe/Lisbon' }` (body "Same time zone as London, all year. Overlaps nicely with most of Europe, mornings with the US east coast.")
  - `experience: { period: string; role: string; org: string; sub?: string; note?: string }[]` (4 entries, the last is the degree with no `note`)
  - `toolbox: { title: string; highlighted: string[]; plain: string[] }`
  - `connect: { linkedinHandle: 'andrenunes-work'; githubHandle: 'anunes9'; copyLabel: 'copy address'; copiedLabel: 'copied' }`
  - `projects: { title: string; intro: string; items: { name: string; line: string; url: string; image: 'fran' | 'bluesoul' | 'espinhal' | 'trt' }[] }`
  - `band: { headlineLead: string; headlineAccent: string; line: string; cta: {label; href} }`
  - `meta: { title: string; description: string; footerRight: 'Built with care in Lisbon'; name: 'André Nunes' }`
- Images are imported by components (Task 4/7), not by the data module; `projects.items[].image` is a key the Projects component maps to its imports.

- [ ] **Step 1: Write the failing test**

```js
// tests/profile.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import * as p from '../src/data/profile.ts';

test('hero copy is the approved copy', () => {
  assert.equal(p.hero.headlineLead, 'From client idea to shipped product,');
  assert.equal(p.hero.headlineAccent, 'with AI in the loop.');
  assert.equal(p.hero.lede, 'I sit between clients and engineers at Runtime Revolution: I help clients decide what to build, help my teams work out how, and still ship code myself.');
  assert.equal(p.hero.byline, 'Team Leader at Runtime Revolution · Lisbon, Portugal');
  assert.equal(p.hero.primary.label, 'Start a conversation');
  assert.equal(p.hero.primary.href, p.links.linkedin);
  assert.equal(p.hero.secondary.href, '#work');
  assert.equal(p.hero.cv, undefined);
});

test('strip, AI work, projects and experience have the approved counts and values', () => {
  assert.deepEqual(p.strip(new Date('2026-10-25')).map(s => s.value), ['8 years', 'Healthcare · Automotive · Travel', '4 live sites']);
  assert.equal(p.strip(new Date('2027-01-02'))[0].value, '9 years');
  assert.equal(p.strip(new Date('2026-10-25'))[0].key, 'Track record');
  assert.equal(p.basedIn.body, 'Same time zone as London, all year. Overlaps nicely with most of Europe, mornings with the US east coast.');
  assert.equal(p.aiWork.items.length, 4);
  assert.equal(p.aiWork.items[0].title, 'Deal parsing from partner sites');
  assert.deepEqual(p.projects.items.map(i => i.name), ['Fran Padel Project', 'Blue Soul Journeys', 'Quinta do Espinhal', 'TRT Adv']);
  assert.equal(p.experience.length, 4);
  assert.equal(p.experience[0].sub, 'Full Stack Developer until 2025');
  assert.equal(p.experience[3].note, undefined);
});

test('one contact verb, no CV links, no phone', () => {
  for (const l of [p.nav.cta.label, p.hero.primary.label, p.band.cta.label]) assert.equal(l, 'Start a conversation');
  const json = JSON.stringify(p);
  assert.ok(!/resume|\.pdf|915238870/i.test(json));
  assert.equal(p.links.email, 'andrenunes.work@gmail.com');
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `node --test tests/profile.test.mjs`
Expected: FAIL, module not found.

- [ ] **Step 3: Write `src/data/profile.ts`**

Copy every string from spec §7 verbatim into the shapes above. Use `export const x: Type = {...}` with interfaces declared in the file (erasable syntax only, so Node can import it directly: no enums, no decorators, no `const` type parameters).

- [ ] **Step 4: Copy the images into `src/assets/`**

- [ ] **Step 5: Run the test**

Run: `node --test tests/profile.test.mjs`
Expected: `3 pass`.

- [ ] **Step 6: Commit**

```bash
git add src/data src/assets tests/profile.test.mjs
git commit -m "feat: add page content and image assets

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 3: Design tokens, global stylesheet, base layout and theme script

**Files:**
- Create: `src/styles/global.css`, `src/layouts/Base.astro`, `src/components/ThemeToggle.astro`, `public/og.jpg`
- Modify: `src/pages/index.astro`, `tests/dist.test.mjs`

**Interfaces:**
- Produces: `Base.astro` with props `{ title: string; description: string }`, rendering `<html lang="en" data-theme="light">`, head (charset, viewport, title, description, `color-scheme` meta with id `color-scheme`, OG title, description and `og:image` as the absolute URL `new URL(withBase('og.jpg'), Astro.site).href` (resolves to `https://anunes9.github.io/me/og.jpg`), favicon links, manifest link, Fontsource imports, the inline theme script), body with skip link `<a class="skip" href="#main">Skip to content</a>`, `<slot name="nav" />`, `<main id="main"><slot /></main>`, `<slot name="footer" />`.
- Produces CSS custom properties on `:root` and `[data-theme="dark"]`: `--bg --card --line --ink --muted --accent --accent-tint --chip --shadow`, exactly the values of spec §6. Utility classes: `.serif`, `.visually-hidden`, `.wrap` (max-width 1120px, padding `0 24px`), `.card`, `.label` (11px uppercase `.12em`), `.btn`, `.btn-primary`, `.chip`, `.chip-hi`. Focus ring rule `:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px }`. `::selection` tinted from the accent.
- Produces: `ThemeToggle.astro`, a `<button type="button" id="theme-toggle" aria-pressed="false">` labelled "Dark theme" whose script flips `data-theme`, `aria-pressed`, the `color-scheme` meta, and writes `localStorage.theme` in try/catch.
- Theme init script (inline in head, `is:inline`): reads `localStorage.theme` in try/catch; if it equals `'dark'` sets `document.documentElement.dataset.theme = 'dark'` and the meta to `dark`; otherwise leaves light. Never reads `matchMedia`.

- [ ] **Step 1: Extend the dist test (Review Focus 3 and 4)**

```js
test('layout: fonts self-hosted, theme defaults light without consulting the OS', () => {
  const html = readDist();
  assert.match(html, /data-theme="light"/);
  assert.ok(!html.includes('prefers-color-scheme'), 'theme must not consult the OS');
  assert.match(html, /try\s*\{[^}]*localStorage/s, 'storage access must be guarded');
  assert.match(html, /<a class="skip" href="#main">/);
  assert.match(html, /property="og:image" content="https:\/\/anunes9\.github\.io\/me\/og\.jpg"/);
  const css = readDistStyles();
  assert.match(css, /\.woff2/, 'self-hosted font files must be referenced');
  assert.ok(!css.includes('googleapis'));
  assert.match(css, /font-family:\s*["']?Instrument Serif/);
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `npm run check`
Expected: the new test FAILs.

- [ ] **Step 3: Generate `public/og.jpg`**

Two `sips` calls from the repo root: `sips -Z 630 src/assets/photo.jpg --out /tmp/og-src.jpg` (scales the portrait to 630px tall), then `sips -p 630 1200 --padColor F6F5F2 /tmp/og-src.jpg --out public/og.jpg` (pads to 1200 × 630 with the page background). Verify with `sips -g pixelWidth -g pixelHeight public/og.jpg` → 1200 × 630.

- [ ] **Step 4: Write `src/styles/global.css`**

Reset (`box-sizing`, margins), tokens, body (`background: var(--bg); color: var(--ink); font-family: Inter, system-ui, sans-serif; -webkit-font-smoothing: antialiased`), utilities and component primitives listed in Interfaces. Buttons: pill, `padding: 11px 18px`, 14px/500, hairline border, `--shadow`; `.btn-primary` is ink on bg; hover lifts 1px (`transition: transform .16s ease-out, box-shadow .16s ease-out`). Cards: `background: var(--card); border: 1px solid var(--line); border-radius: 22px; padding: 22px; box-shadow: var(--shadow)`. Underline offset `.14em` for inline links. Reduce motion: `@media (prefers-reduced-motion: reduce) { * { transition: none !important } }`.

- [ ] **Step 5: Write `src/layouts/Base.astro` and `src/components/ThemeToggle.astro`**

Fontsource imports in frontmatter: `@fontsource/inter/400.css`, `@fontsource/inter/500.css`, `@fontsource/inter/600.css`, `@fontsource/instrument-serif`, `@fontsource/instrument-serif/400-italic.css`, then `../styles/global.css`. Head also carries `og:type` `website`, `og:url` (`Astro.site` + base) and `twitter:card` `summary_large_image`. `global.css` ends with the print block: `@media print` forces light tokens, hides `nav, .band, .btn, #theme-toggle, .skip`, removes shadows, collapses the grid to one column, and shows the plain addresses in Connect (see Task 6 for the markup hook).

- [ ] **Step 6: Point `src/pages/index.astro` at the layout**

Wrap the placeholder `<h1>` in `<Base title={meta.title} description={meta.description}>`.

- [ ] **Step 7: Build and test**

Run: `npm run check`
Expected: all pass.

- [ ] **Step 8: Browser check**

Run `npm run dev` (or the app's preview) and load `http://localhost:4321/me/`. Confirm: Inter renders (not a system sans), the skip link appears on first Tab, no console errors, and `localStorage.setItem('theme','dark')` + reload shows dark.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat: add design tokens, base layout, self-hosted fonts and theme toggle

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 4: Nav, Hero and Strip

**Files:**
- Create: `src/components/Nav.astro`, `src/components/Hero.astro`, `src/components/Strip.astro`
- Modify: `src/pages/index.astro`, `tests/dist.test.mjs`

**Interfaces:**
- Consumes: `nav`, `hero`, `strip`, `meta` from `src/data/profile.ts`; `Image` from `astro:assets` with `src/assets/photo.jpg`; `ThemeToggle`.
- Produces: `Nav.astro` (`<nav aria-label="Primary">`, text monogram "AN" (Inter 600, `letter-spacing: .08em`) linking `#main`, `<ul>` of `nav.items` as `<a>`, `ThemeToggle`, cta button). Not sticky. Below 480px the `<ul>` is hidden and the toggle shows its icon only, keeping its `aria-label`. `Hero.astro` (`<section class="hero">`: `<h1 class="serif">{headlineLead}<br><em>{headlineAccent}</em></h1>`, `<p class="lede">`, buttons, `<p class="byline">`, `<Image src={photo} alt={meta.name} width={600} height={750} />` in a 4:5 frame). `Strip.astro` (`<section class="strip" aria-label="At a glance">` with three `<div>` cells: `<h2 class="label">{key}</h2>`, `<p class="value">`, `<p class="support">`).
- Strip renders `strip(new Date())` from the data module.
- Layout rules from spec: hero two columns `1.25fr .75fr`, `align-items: start`, gap 40px at ≥860px; `h1 em { white-space: nowrap }` at ≥860px and `h1 br { display: none }` below; `text-wrap: balance`; photo `object-position: 50% 30%`, radius 20px, max width 300px, 120px wide above the headline below 480px. Strip: three columns at ≥860px, one column below with hairlines between; no hover state.

- [ ] **Step 1: Extend the dist test**

```js
test('nav, hero and strip', () => {
  const html = readDist();
  assert.equal(count(html, '<h1'), 1);
  assert.match(html, /<h1[^>]*>From client idea to shipped product,<br><em>with AI in the loop\.<\/em><\/h1>/);
  assert.equal(count(html, '>Start a conversation'), 2, 'nav and hero share one verb (Task 7 raises this to 3 with the band)');
  assert.match(html, /<nav aria-label="Primary"/);
  assert.match(html, /<img[^>]+alt="André Nunes"/);
  assert.match(html, /<h2 class="label">Track record<\/h2>\s*<p class="value">\d+ years/);
  assert.match(html, /<p class="value">4 live sites/);
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `npm run check` — expected FAIL on the h1 match.

- [ ] **Step 3: Write the three components and compose them in `index.astro`**

`index.astro` renders `<Nav slot="nav" />`, then `<div class="wrap"><Hero /><Strip /></div>` inside `<main>`.

- [ ] **Step 4: Build and test**

Run: `npm run check` — expected PASS.

- [ ] **Step 5: Browser check at 1280 and 375**

At 1280: accent phrase on one line, photo top edge level with the h1's top, byline under the buttons. At 375: no horizontal scroll, nav shows monogram + toggle + button only, strip stacks.

- [ ] **Step 6: Commit** — `feat: add nav, hero and quick strip`

---

### Task 5: AI-first work, About and Based in (with Lisbon clock)

**Files:**
- Create: `src/components/Grid.astro` (the 12-column `<section class="grid">` wrapper), `src/components/AiWork.astro`, `src/components/About.astro`, `src/components/BasedIn.astro`
- Modify: `src/pages/index.astro`, `tests/dist.test.mjs`

**Interfaces:**
- Consumes: `aiWork`, `about`, `basedIn`.
- Produces: `Grid.astro` with `grid-template-columns: repeat(12, 1fr); gap: 14px`, child utility classes `.span-5 .span-7 .span-12` collapsing to 12 below 860px (6/6 between 860 and 1024 is allowed). `AiWork.astro` = `<article id="work" class="card span-12">` with `<h2 class="label">AI-first work</h2>`, `<h3>{title}</h3>`, intro `<p>`, and a 4-up `<ul class="ai-grid">` of `<li><strong>{title}</strong><span>{line}</span></li>` with a 2px accent top border per item (4-up ≥1024, 2-up below, 1-up below 600px). `About.astro` = `<article id="about" class="card span-7">` with label, `<h3>`, body `<p>`, aside `<p class="aside">` pinned to the bottom. `BasedIn.astro` = `<article class="card span-5">` with label "Based in", `<h3>`, body, and `<p class="clock"><time id="lisbon-time" datetime="" class="serif">--:--</time> <span class="label-inline">{clockLabel}</span></p>` plus a bundled `<script>` that formats `Intl.DateTimeFormat('en-GB', { timeZone: basedIn.timeZone, hour: '2-digit', minute: '2-digit' })` every 15 s and sets `datetime` to the ISO string.
- Every card sets `scroll-margin-top: 24px` (more if the nav becomes sticky).

- [ ] **Step 1: Extend the dist test**

```js
test('AI-first work, about and based in', () => {
  const html = readDist();
  assert.match(html, /<article id="work"[^>]*>\s*<h2 class="label">AI-first work<\/h2>\s*<h3>Where AI sits in the product, not just the process<\/h3>/);
  assert.equal(count(html, '<li><strong>'), 4);
  assert.match(html, /<time id="lisbon-time"[^>]*>--:--<\/time>/);
  assert.match(html, /Europe\/Lisbon/);
  assert.match(html, /Off the clock: padel, music, cars, and long walks with the dog\./);
});
```

- [ ] **Step 2: Run to verify it fails** — `npm run check`, expected FAIL.

- [ ] **Step 3: Write the four components; add `<Grid>` with `<AiWork /><About /><BasedIn />` under the strip in `index.astro`**

- [ ] **Step 4: Build and test** — `npm run check`, expected PASS.

- [ ] **Step 5: Browser check**

Clock shows Lisbon time (compare with `TZ=Europe/Lisbon date +%H:%M`), not the machine's zone if they differ; About aside sits at the card bottom; at 1280 About and Based in share a row.

- [ ] **Step 6: Commit** — `feat: add AI-first work, about and location cards`

---

### Task 6: Experience, Toolbox and Connect (with copy button)

**Files:**
- Create: `src/components/Experience.astro`, `src/components/Toolbox.astro`, `src/components/Connect.astro`, `src/components/CopyEmail.astro`
- Modify: `src/pages/index.astro`, `tests/dist.test.mjs`

**Interfaces:**
- Consumes: `experience`, `toolbox`, `connect`, `links`.
- Produces: `Experience.astro` = `<article id="experience" class="card span-7">`, label, `<ol class="timeline">` of `<li>` with `<p class="period">`, `<p class="role">`, `<p class="org">{org}{sub ? ' · ' + sub : ''}</p>`, optional `<p class="note">`; two columns `110px 1fr` at ≥480px, stacked below. `Toolbox.astro` = `<article class="card span-5">`, label "Toolbox", `<h3>{title}</h3>`, `<ul class="chips">` highlighted first as `<li class="chip chip-hi">`, then plain `<li class="chip">`. `Connect.astro` = `<article class="card span-5">`, label "Connect", `<ul class="links">` with LinkedIn and GitHub external links (handle in a muted `<span>`) and `<CopyEmail />`. `CopyEmail.astro` = `<li><button type="button" class="copy" data-email={links.email}>Email <span class="copy-label">{copyLabel}</span></button><span class="print-only">{links.email}</span><span class="visually-hidden" aria-live="polite" id="copy-status"></span></li>`. Each Connect link likewise carries a `<span class="print-only">` with its bare URL (`linkedin.com/in/andrenunes-work`, `github.com/anunes9`); `.print-only` is `display: none` on screen and shown by the print block while `.copy` and the handle spans are hidden. with a bundled script: on click, `navigator.clipboard.writeText(email)`; on success set label to `copiedLabel`, add class `done`, set live region text "Email address copied", revert after 1800 ms; on rejection or when `navigator.clipboard` is undefined, set the label to the email address itself and leave it.
- Right column order in `index.astro`: `<Experience /><Toolbox /><Connect />` (auto-placement puts Toolbox and Connect beside Experience).

- [ ] **Step 1: Extend the dist test (Review Focus 2)**

```js
test('experience, toolbox and connect', () => {
  const html = readDist();
  assert.equal(count(html, '<li class="chip chip-hi">'), 5);
  assert.equal(count(html, '<li class="chip">'), 11);
  assert.match(html, /<p class="org">Runtime Revolution · Full Stack Developer until 2025<\/p>/);
  assert.match(html, /Bachelor's degree in Information Technologies/);
  assert.ok(!/Full CV/.test(html));
  assert.match(html, /<button type="button" class="copy" data-email="andrenunes\.work@gmail\.com"/);
  assert.match(html, /aria-live="polite"/);
  assert.equal(count(html, 'class="print-only"'), 3);
  assert.match(html, /rel="noopener noreferrer"/);
  assert.match(html, /\(opens in new tab\)/);
});
```

- [ ] **Step 2: Run to verify it fails** — expected FAIL.

- [ ] **Step 3: Write the four components and add them to the grid**

- [ ] **Step 4: Build and test** — expected PASS.

- [ ] **Step 5: Browser check**

Click the copy button: label reads "copied" in accent, reverts. Then in DevTools run `Object.defineProperty(navigator,'clipboard',{value:undefined})` and click again: label shows the address. Keyboard: Tab reaches the button and the ring is visible.

- [ ] **Step 6: Commit** — `feat: add experience, toolbox and connect cards`

---

### Task 7: Side projects, closing band and footer

**Files:**
- Create: `src/components/Projects.astro`, `src/components/Band.astro`, `src/components/Footer.astro`
- Modify: `src/pages/index.astro`, `tests/dist.test.mjs` (tighten the "Start a conversation" count to exactly 3)

**Interfaces:**
- Consumes: `projects`, `band`, `meta`, `links`; images from `src/assets/projects/` imported in `Projects.astro` and mapped by `item.image` key to the `ImageMetadata`.
- Produces: `Projects.astro` = `<article id="projects" class="card span-12">`, label "Side projects", `<h3>`, intro, `<ul class="pgrid">` of `<li><a href target="_blank" rel="noopener noreferrer"><Image src alt="" width={800} height={500} /><strong>{name}</strong><span>{line}</span><span class="visually-hidden">(opens in new tab)</span></a></li>`; 4-up ≥1024, 2-up below, 1-up below 480; image `aspect-ratio: 16/10; object-fit: cover; object-position: top`; hover lifts 2px. `Band.astro` = `<section class="band" aria-labelledby="band-title">` with inverted tokens (background `var(--ink)`, text `var(--bg)`), `<h2 id="band-title" class="serif">{headlineLead} <em>{headlineAccent}</em></h2>` where the `em` keeps the accent colour in both themes, `<p>{line}</p>`, cta button (`white-space: nowrap`). `Footer.astro` = `<footer class="wrap">© {year} {meta.name}</footer>` + `{meta.footerRight}`, `year = new Date().getFullYear()` at build.

- [ ] **Step 1: Extend the dist test**

```js
test('projects, band and footer', () => {
  const html = readDist();
  assert.equal(count(html, 'class="pgrid"'), 1);
  assert.equal(count(html, 'https://www.franpadelproject.com/'), 1);
  assert.equal(count(html, 'target="_blank"'), 9, 'three CTAs + LinkedIn + GitHub in Connect + four projects');
  assert.equal(count(html, '(opens in new tab)'), 9);
  assert.match(html, /<h2 id="band-title" class="serif">Have a product that needs <em>building<\/em>\?<\/h2>/);
  assert.match(html, new RegExp(`© ${new Date().getFullYear()} André Nunes`));
  assert.equal(count(html, '>Start a conversation'), 3);
});
```

- [ ] **Step 2: Run to verify it fails** — expected FAIL.

- [ ] **Step 3: Write the three components; add `<Projects />` to the grid, then `<Band />` after the grid, `<Footer slot="footer" />`**

- [ ] **Step 4: Build and test** — expected PASS; also confirm `dist/_astro/` contains optimised copies of the five images.

- [ ] **Step 5: Browser check**

Projects 4-up at 1280 with legible thumbnails; band button on one line; dark theme keeps "building" green.

- [ ] **Step 6: Commit** — `feat: add side projects, closing band and footer`

---

### Task 8: Responsive, states and accessibility pass

**Files:**
- Modify: any component styles as needed, `tests/dist.test.mjs`, create `tests/a11y.test.mjs`

**Interfaces:**
- Consumes everything above. Produces no new API.

- [ ] **Step 1: Write the static accessibility test (Review Focus 1 partly, plus heading outline)**

```js
// tests/a11y.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import { readDist, readDistStyles, count } from './helpers.mjs';

test('heading outline is h1 > h2 labels > h3 titles, one main, nav links are anchors', () => {
  const html = readDist();
  const order = [...html.matchAll(/<h([1-3])/g)].map(m => Number(m[1]));
  assert.equal(order[0], 1);
  for (let i = 1; i < order.length; i++) assert.ok(order[i] - order[i - 1] <= 1, `heading jump at index ${i}`);
  assert.equal(count(html, '<main'), 1);
  assert.ok(!/<li>Work<\/li>/.test(html));
  assert.match(readDistStyles(), /overflow-wrap:\s*anywhere/, 'long emails and handles must wrap on phones');
});
```

- [ ] **Step 2: Run it** — expected PASS if Tasks 3–7 followed their interfaces; fix any failure in the owning component.

- [ ] **Step 3: Browser pass at 375, 768 and 1280, light and dark**

Checklist: print preview (Cmd+P in the browser pane, or `@media print` emulation) shows one light column with the three plain addresses and no nav, buttons or band; no horizontal overflow (`document.documentElement.scrollWidth === window.innerWidth` at 375); every control ≥40px tall on the phone layout; hover states on buttons, strip cells, project cards and connect links; focus ring visible on every link and button when tabbing; dark cards visibly separate from the page; label text never below 11px (`getComputedStyle` on `.label`); the hero photo is 120px wide above the headline below 480px; 768px is not a stretched phone layout.

- [ ] **Step 4: Run the design detector once**

Run: `"/Users/andre/.claude/plugins/cache/impeccable/impeccable/4.7.1/skills/impeccable/scripts/impeccable" detect --json dist/index.html`
Expected: no `low-contrast`, `undersized-ui-text`, `skipped-heading` or `hero-eyebrow-chip` findings. (`overused-font` for Inter is accepted; `italic-serif-display` is the brief's choice.)

- [ ] **Step 5: Fix what the pass found, rebuild, rerun `npm run check`**

- [ ] **Step 6: Commit** — `fix: responsive, state and accessibility pass`

---

### Task 9: Lighthouse, deploy readiness and handover

**Files:**
- Modify: `README.md` if anything changed; no new code expected.

- [ ] **Step 1: Production preview**

Run: `npm run build && npm run preview` and load `http://localhost:4321/me/`. Confirm fonts, images and the manifest load from `/me/...` (Network panel: zero 404s, zero third-party requests).

- [ ] **Step 2: Lighthouse (mobile) via the browser pane or `npx lighthouse http://localhost:4321/me/ --preset=desktop --only-categories=performance,accessibility,best-practices,seo --quiet --chrome-flags="--headless"`**

Expected: performance ≥ 95, accessibility ≥ 95. Record the numbers in the final report.

- [ ] **Step 3: Verify the deploy command without pushing**

Run: `npx gh-pages --help` to confirm `--dotfiles` is supported, and `ls -a dist` shows `.nojekyll`, `index.html`, `_astro/`, `og.jpg`, `manifest.json`, favicons. Do **not** run `npm run deploy`; deployment is the owner's call.

- [ ] **Step 4: Final `npm run check`, `git status` clean, commit any leftovers** — `docs: finish README for the Astro site`

- [ ] **Step 5: Report**

Summarise what was built, the Lighthouse numbers, the exact deploy command (`npm run deploy`, which pushes `dist/` to `gh-pages`), and the known follow-ups: a current CV PDF to link, better project captures, the Team Leader date if it changes.
