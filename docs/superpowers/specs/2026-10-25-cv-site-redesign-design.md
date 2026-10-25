# CV site redesign — design

Date: 2026-10-25
Owner: André Nunes
Site: https://anunes9.github.io/me (repo `anunes9/me`, source on `master`, published from the `gh-pages` branch, which stays the repository's default branch by the owner's choice)

Visual reference: `docs/superpowers/specs/2026-10-25-cv-site-redesign-sketch/index.html` (the approved brainstorm mockup, final revision; open it in a browser). The sketch is a throwaway and must not be copied as code; it is the picture of what the result should look like. Where this document and the sketch disagree, this document wins.

## 1. Intent and why

The current site is a one-page résumé laid out like a printed CV: name, contact, bio, job list, skills columns. It is accurate but anonymous, and it still describes André as a full-stack developer. His role has changed: he is now a Team Leader at Runtime Revolution leading AI-first client projects, splitting his week between clients, the teams he leads, and the code. The site should make that pitch to two readers, a prospective client and a hiring manager, and give both a reason and a way to start a conversation.

The redesign also replaces a deprecated build (Create React App 4, React 17, Mantine 6) with a static site that will stay buildable.

## 2. Goals, non-goals, anti-goals

Goals

- A visitor understands within one screen what André does now and what happens if they contact him.
- Proof of the AI-first claim is visible before the biography.
- One contact path, LinkedIn, repeated with one verb.
- Reads well on a phone; the layout is credited as UI evidence for a React/React Native developer.
- Fast: static HTML, no client framework shipped. Lighthouse performance and accessibility in the high 90s.
- Deploys to GitHub Pages at the existing URL with the existing `npm run deploy` habit.

Non-goals

- No blog, notes, or "digital garden".
- No CMS. Content lives in one data file in the repo.
- No contact form, analytics, or third-party embeds.
- No CV page or PDF in this build. The old Bootstrap résumé in `src/resume-pdf` is out of date and is removed; a current PDF can be linked later by adding one entry to the data file (see §7).
- No animation beyond hover states and the theme switch.

Anti-goals (what would make this a failure even if it works)

- Looks like a template: emoji icon rows, gradient text, kicker labels above headings, a hero metric strip of big numbers.
- A pure CLI/terminal gimmick or a scroll-jacked intro.
- The visitor's own time shown under "Based in Lisbon".
- Any claim on the page André did not make (invented response times, team sizes, availability).

## 3. Constraints

- Hosting: GitHub Pages, project site, served under the `/me/` base path. Must set the Astro `site` to `https://anunes9.github.io` and `base` to `/me`. No custom domain is planned; the code stays base-agnostic so a later domain is a `base` change plus a `CNAME` file.
- Deploy: `npm run deploy` builds and pushes the output directory to the `gh-pages` branch using the `gh-pages` package already in `devDependencies`, replacing the CRA `build` directory with Astro's `dist`.
- Node 24 on the owner's machine; `yarn` is not installed, use `npm`. Remove `yarn.lock`. Pin the runtime: `.tool-versions` with `nodejs 24.6.0` and `"engines": { "node": ">=22.23.4" }` in `package.json`.
- Language: English only; no Portuguese version.
- Keep the existing favicon files in `public/`. `manifest.json` currently uses absolute `/android-chrome-*.png` paths that break under `/me/`; fix its paths and link it from `<head>`. Add an empty `public/.nojekyll` so GitHub Pages serves Astro's `_astro/` directory.
- Internal URLs (anchors excepted) are built from `import.meta.env.BASE_URL`, never hard-coded with `/me/`.
- The owner's photo is `IMG_9855.heic` converted to JPEG; the converted file is at `docs/superpowers/specs/2026-10-25-cv-site-redesign-sketch/photo.jpg` and must be moved into `src/assets/`.
- Side-project thumbnails: four images in the sketch folder (`shot-fran.jpg`, `shot-bluesoul.jpg`, `shot-espinhal.jpg`, `shot-trt.png`), to be moved into `src/assets/projects/`. They are screenshots and one social image, adequate for 300px-wide cards at 2× density; replacing them later with better captures is a content change, not a code change.

## 4. How it gets made (decided)

- Astro (current stable), static output, one route `/`. Plain CSS with custom properties; no Tailwind, no Mantine, no React. Islands are not needed; the two interactive pieces (theme toggle, copy-email button) are small inline scripts.
- Fonts self-hosted through Fontsource packages: static Inter 400, 500 and 600 (`@fontsource/inter`, not the variable build, to keep the Latin download near 75KB) for body and UI, Instrument Serif regular and italic for display. JetBrains Mono is dropped; the clock uses Inter with tabular numerals. No Google Fonts requests at runtime.
- Content model: a single typed data module, e.g. `src/data/profile.ts`, exporting the hero, strip facts, AI-first items, about, location, experience, toolbox, projects, links and band copy. Components render from it; no copy is hard-coded in components. Two strip facts are derived at build time rather than typed: the years figure from `careerStart: 2018` (`currentYear - careerStart`), and the live-sites count from `projects.items.length`.
- Images through Astro's `<Image>` from `src/assets/`, with explicit width/height and `alt`.
- Project layout, component names and file structure are the builder's call.

## 5. Page structure (single page, in order)

1. Nav: text monogram "AN" (Inter 600, slight letter spacing; the old `logo.svg` files are deleted) at left; centre links Work (`#work`, the AI-first card; Side projects has no nav item), Experience, About; theme toggle; right button "Start a conversation" (LinkedIn profile URL, no message-compose deep link). Below 480px the centre links collapse; the monogram, an icon-only toggle with an accessible label, and the button remain. The nav is not sticky.
2. Hero: two columns at ≥860px (headline column 1.25fr, photo column .75fr, top-aligned); stacked below.
3. Quick strip: three cells of facts.
4. AI-first work: full-width card with four items.
5. About (7/12) beside Based in (5/12).
6. Experience (7/12, three entries plus education line) beside Toolbox and Connect stacked (5/12 each).
7. Side projects: full-width card with four image cards.
8. Closing band: inverted colours, one headline, one line, one button.
9. Footer: copyright and "Built with care in Lisbon".

Grid: 12 columns, 14px gap, cards with 22px radius, 1px hairline border and a soft offset shadow. Below 860px every card spans 12 columns; between 860px and 1024px the 7/5 pairs may become 6/6 (builder's call). Section anchors: `#work` on the AI-first card, `#projects` on side projects, `#experience`, `#about`.

## 6. Visual system

Register: editorial. Calm, typographic, no stickers, no emoji, no decorative gradients or glows, no map illustration. Warmth comes from the serif, the photo, and the copy.

Tokens (light / dark)

- background `#f6f5f2` / `#0c0c0d`
- card `#ffffff` / `#17171a` (dark cards one step lighter than the sketch so they separate from the page)
- hairline `rgba(20,20,20,.08)` / `rgba(255,255,255,.10)`
- ink `#15140f` / `#f3f2ee`
- muted `#6b6a64` / `#9a9890`
- accent `#1f8a70` / `#5ad1ae`
- accent tint `rgba(31,138,112,.10)` / `rgba(90,209,174,.12)`
- chip `#f1f0ec` / `#1d1d20`
- shadow: light `0 1px 2px rgba(0,0,0,.04), 0 12px 32px -16px rgba(0,0,0,.12)`; dark `0 20px 40px -24px rgba(0,0,0,.8)`

Type

- Display: Instrument Serif, h1 `clamp(44px, 6.2vw, 76px)`, line-height .98, letter-spacing -.01em. The accent phrase in the h1 is italic in the accent colour and must hold one line at ≥860px (manual `<br>` before it; the break is removed below 860px and `text-wrap: balance` applies).
- Body: Inter 400/500/600. Lede 17px/1.55, card body 14–15px/1.55, strip values 15px/500, card titles 18px/500.
- Small labels (card and strip keys) are 11px uppercase with .12em tracking, never below 11px. They are rendered as `h2` elements styled small, so the heading outline is h1 → h2 (card) → h3 (card title).
- Accent chips use ink on accent tint, not accent on tint, so they pass 4.5:1 in light mode.
- The serif appears in exactly three places: h1, the clock, the band headline.

Colour use

- Accent is used for: the italic phrase in the h1, the strip key markers, highlighted toolbox chips (as tint), the copy button's "copied" state, focus rings, and the italic word in the band (keep it coloured in both themes; do not fall back to opacity).

States and browser surfaces

- Buttons: hover lifts 1px with a slightly stronger shadow; primary button darkens 8% on hover.
- Connect links and project cards have a hover state (background shift or 2px lift). Strip cells are not interactive and have none.
- Visible `:focus-visible` ring: 2px accent, 3px offset, on every link and button.
- Selection colour tinted from the accent. Underline offset set on inline links.
- Theme: light by default; a toggle in the nav switches to dark, stored in `localStorage`, applied before first paint by an inline script in `<head>` to avoid a flash. `color-scheme` meta set accordingly.

Responsive

- Breakpoints: 480px (nav collapses, strip stacks to one column, timeline stacks date above role, hero photo becomes a 120px-wide portrait above the headline), 860px (hero becomes two columns, grid pairs apply), 1024px (full 12-column layout). Project cards: 4-up ≥1024px, 2-up below, 1-up below 480px. AI-first items: 4-up ≥1024px, 2-up below 1024px, 1-up below 600px.
- No horizontal overflow at 375px. Long strings (email, URLs) wrap with `overflow-wrap: anywhere`.
- Tap targets at least 40px tall on phones.

Print

- A print stylesheet: one column, light tokens, no shadows; nav, theme toggle, buttons and the closing band hidden; in Connect the handles and the copy button are replaced by plain text `linkedin.com/in/andrenunes-work`, `github.com/anunes9` and the email address. No custom 404 page.

Accessibility

- `<main>` landmark, skip link to main, `lang="en"`.
- Heading outline as above; nav items are `<a>` elements.
- Project card images have empty `alt` because the card text names the site; the link text includes a visually hidden "(opens in new tab)". External links use `rel="noopener noreferrer"`.
- Clock rendered inside `<time>` with a `datetime` attribute, computed with `Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Lisbon', hour: '2-digit', minute: '2-digit' })`, labelled "Lisbon time", updated every 15 seconds. Server-rendered placeholder shows "--:--" until the script runs.
- Copy-email control is a `<button>`; after copying it announces "copied" via the visible label and an `aria-live="polite"` region, and reverts after about two seconds. If the clipboard API is unavailable it shows the address in the label instead.

## 7. Content (final copy)

Nav button, hero primary button, band button: **Start a conversation** → `https://www.linkedin.com/in/andrenunes-work/`.

Hero secondary button: **See the work →** → `#work`. (A "View CV" button is deliberately absent until a current PDF exists; when it does, add `cv: { label: "View CV", href: "<path>" }` to the hero data and render it as the secondary button, moving "See the work" out.)

Hero

- h1: `From client idea to shipped product,` `<br>` `<em>with AI in the loop.</em>`
- Lede: "I sit between clients and engineers at Runtime Revolution: I help clients decide what to build, help my teams work out how, and still ship code myself."
- Byline under the buttons: "Team Leader at Runtime Revolution · Lisbon, Portugal"
- Photo: `photo.jpg`, 4:5 portrait, 300px wide at desktop, `object-position: 50% 30%`, 20px radius. `alt="André Nunes"`.

Quick strip (key / value / support)

- Track record / **{years} years** (computed from 2018) / Shipping web and mobile since 2018
- Industries / **Healthcare · Automotive · Travel** / From medical records to vehicle production
- On the side / **{n} live sites** (computed from the projects list) / Built for real small businesses

AI-first work (`#work`)

- Title: "Where AI sits in the product, not just the process"
- Intro: "Four things shipped with clients recently. Names left out, the work speaks."
- Items (title / line):
  - Deal parsing from partner sites / Parses partner websites for live deals so users get a better offer than the one on the page.
  - Interactive prompts in travel articles / Interactive prompts inside travel articles that engage readers and turn them into travel leads.
  - Image scan to marketplace listing / Scans an image for items and publishes them straight into a marketplace.
  - Negotiation agent for the marketplace / Negotiates marketplace items on the user's behalf.

About (`#about`)

- Title: "Hi, I'm André. A developer from Lisbon who likes to know how things are made and why."
- Body: "I started mobile, learned the backend because the project needed it, and grew into leading teams. These days I sit between clients and engineers, and I like it there: close enough to the idea to shape it, close enough to the code to ship it. AI tooling is in hand from the first sketch, on every project."
- Closing line: "Off the clock: padel, music, cars, and long walks with the dog."

Based in

- Title: "Oeiras, Lisbon"
- Body: "Same time zone as London, all year. Overlaps nicely with most of Europe, mornings with the US east coast."
- Clock (Lisbon time) with the label "Lisbon time".

Experience (`#experience`)

- 2023 → now · Team Leader, AI-first projects · Runtime Revolution · Full Stack Developer until 2025 · "Back for a second stint: first rebuilding the core of a travel and promotions product, now leading teams on client projects built with AI tooling from day one."
- 2022 → 2023 · Full Stack Developer · Volkswagen Digital Solutions · "XP, pairing and TDD every day. Vehicle production tracking, contract generation and e-signing, and an electric-vehicle proof of concept from inception to build."
- 2018 → 2022 · Full Stack & Mobile Developer · Runtime Revolution · "Built a healthcare records app from scratch in React Native, then its web app and Rails API. Later lead developer and team manager on a sports app."
- 2018 · Bachelor's degree in Information Technologies · Faculdade de Ciências, University of Lisbon (one short line, same list, no note)
- No "Full CV" link in this build (same rule as the hero: add it to the data file when a PDF exists).

Toolbox

- Title: "What I reach for"
- Highlighted chips: TypeScript, React, React Native, Ruby on Rails, Claude Code
- Plain chips: Node.js, PostgreSQL, AWS, Lambda, Redis, Kafka, ElasticSearch, TDD, Pair programming, AI-first delivery, Team leadership

Connect

- LinkedIn · andrenunes-work → `https://www.linkedin.com/in/andrenunes-work/`
- GitHub · anunes9 → `https://github.com/anunes9`
- Email · copy address (button; copies `andrenunes.work@gmail.com`; the address sits in plain form in the markup, no obfuscation)

Side projects (`#projects`)

- Title: "Four live sites, built on the side"
- Intro: "A padel academy, a dive travel company, a country guesthouse and a trail-bike community. Each one started as an idea someone brought me."
- Cards (name / line / url / image):
  - Fran Padel Project / Padel academy · clinics & bookings / https://www.franpadelproject.com/ / shot-fran.jpg
  - Blue Soul Journeys / Dive travel · multilingual, destinations & inquiries / https://www.bluesouljourneys.com/en / shot-bluesoul.jpg
  - Quinta do Espinhal / Guesthouse · gallery & reservations / https://www.espinhal-artesanal.com/ / shot-espinhal.jpg
  - TRT Adv / Trail bike community · rides & kit / https://www.trtadv.com/ / shot-trt.png

Closing band

- Headline: "Have a product that needs *building*?" (italic accent on "building")
- Line: "Happy to talk about leading teams, AI-first delivery, or an idea you want sketched out. The quickest way to reach me is a LinkedIn message."
- Button: Start a conversation →

Footer: "© 2026 André Nunes" · "Built with care in Lisbon". The year is computed at build time.

Head: `<title>André Nunes — Team Leader, AI-first projects</title>`; meta description "Team Leader at Runtime Revolution in Lisbon. From client idea to shipped product, with AI in the loop."; Open Graph title, description, `og:type` website, `og:url` and image; `twitter:card` `summary_large_image`; existing favicons; `<link rel="manifest">`.

Open Graph image: a static `public/og.jpg`, 1200×630, cropped from the photo (face right of centre, page background colour `#f6f5f2` filling the rest, or a plain centre crop if that is simpler), referenced by absolute URL `https://anunes9.github.io/me/og.jpg`. Generated once with `sips` or an image tool and committed; not produced by the build.

## 8. Removed from the current site, on purpose

The `src/resume-pdf` folder and all links to a CV, `src/assets/logo.svg` and `logo-black.svg`, the phone number (not shown anywhere), the long personal bio paragraph, the three-column skills list with soft skills, the Languages and Interests sidebar (interests survive as one line in About; languages are dropped from the page and remain in the CV), the Mantine dark/light `ColorSchemeProvider`, the CRA service worker and web-vitals reporting.

## 9. Left to the builder

- Component and file naming, CSS organisation (one global stylesheet or per-component scoped styles), and whether 860–1024px pairs become 6/6.
- Exact hover and transition timings (keep them under 200ms, ease-out).
- Anything this document is silent on (nav button style, strip cell layout, band layout, timeline visuals) follows the sketch, re-implemented rather than copied. The sketch is only wrong where §6 overrides it: dark cards are lighter, there is no monospace face, small labels are 11px, accent chips are ink on tint, decorations are gone.
- Theme: light is the default for everyone, including visitors whose OS prefers dark; `prefers-color-scheme` is not consulted. The toggle updates the `color-scheme` meta as well as the `data-theme` attribute.
- How the theme toggle looks (a small labelled button is enough; no icon library is required, an inline SVG sun/moon pair is fine).
- README replacement describing `npm run dev`, `npm run build`, `npm run deploy`.
- Removing CRA leftovers: `react-scripts`, `src/mantine`, `src/App.js`, `src/index.js`, `reportWebVitals.js`, `build/`, `yarn.lock`, the CRA `public/index.html`, and `src/resume-pdf`. Deploying replaces the old CRA output on `gh-pages` entirely; that is expected.
- Repo hygiene: `docs/` is committed; `.impeccable/` and `.superpowers/` are ignored; `.claude/launch.json` is updated to start Astro (`npm run dev`, port 4321) so the app's preview works.

## 10. Accepted trade-offs

- A reader can infer the travel client from the Experience note and two of the AI-first items; no client is named, and that is acceptable.
- The email address is scrapeable; it was already public on the previous site.
- `gh-pages` remains the default branch; visitors to the repository see build output first.

## 11. Done looks like

- `npm run build` produces `dist/` with one HTML page, self-hosted fonts, optimised images, and no JavaScript other than the theme and copy scripts.
- `npm run dev` serves the page locally; the page matches the sketch at 1280px, holds together at 768px, and has no horizontal overflow at 375px.
- All copy on the page is exactly §7.
- Lighthouse (mobile) performance ≥ 95, accessibility ≥ 95, no console errors.
- `npm run deploy` pushes `dist/` to `gh-pages` and the site loads at https://anunes9.github.io/me/ with working fonts, images and links under the `/me/` base.
