# Build Progress

Legend: [x] done · [~] in progress · [ ] not started

## Phase 0 — Project Setup
- [x] Reviewed strategy PDF, resume, GitHub profile, reference site
- [x] Wrote `BUILD_PLAN.md` (unique plan for this build)
- [x] `git init`, organized `docs/`
- [x] Scaffold Next.js 16 (App Router) + TypeScript + Tailwind v4 + ESLint app
- [x] Install shadcn/ui (button, card, badge, dialog, separator, navigation-menu) + Motion (Framer Motion successor)
- [x] `next build` verified clean on bare scaffold
- [x] Initial scaffold commit

## Phase 1 — Content Compiling
- [x] `data/profile.ts` — bio, tagline, education, contact links, stats
- [x] `data/skills.ts` — 6 grouped skill categories from resume (49 skills)
- [x] `data/experience.ts` — 2 work experience entries + 4 achievements
- [x] `data/experience.ts` (publications section) — 5 research/publication entries with real links extracted from resume PDF hyperlinks (PyMuPDF)
- [x] `data/projects.ts` — all 43 GitHub repos, tagged by domain/subcategory; 5 flagship projects with full Problem/Approach/Outcome case studies + metrics; real GitHub + live-demo URLs extracted directly from resume PDF hyperlinks (not guessed)
- [x] `data/domains.ts` — 7 domain definitions (name, color, description)
- [x] `public/resume.pdf` — resume copied in for the site's download link
- [x] `tsc --noEmit` clean
- [x] Commit: content layer

## Phase 2 — Layout Architecture
- [x] Global layout: `SiteHeader` (desktop + mobile nav, resume button) + `SiteFooter` (social links)
- [x] `/` — hero (Bento intro grid: name/tagline/intro, 4-stat bento grid, quick links, domain grid preview, featured work grid)
- [x] `/projects` — domain overview grid (7 color-coded domain cards) + live client-side search across all 43 projects
- [x] `/projects/[domain]` — grouped project list by subcategory, color-coded per domain, statically generated for all 7 domains
- [x] Project detail modal (shadcn Dialog): flagship projects show full Problem/Approach/Outcome case study + metric pill + tech badges + Live Demo/GitHub buttons; others show tagline + tech + links
- [x] `/about` — bio, 6 skills groups, experience timeline (dotted-line style), achievements, research & publications with real links
- [x] `/contact` — contact link list (email/GitHub/LinkedIn/phone) + resume download, no data-collecting form
- [x] `tsc --noEmit` clean, `next build` clean (all 7 domain pages statically prerendered)
- [x] Manually clicked through every route + the project detail dialog in Chrome — all working
- [x] Commit: layout architecture

## Phase 3 — Refactor & Accessibility
- [x] Removed unused `create-next-app` boilerplate assets (file/globe/next/vercel/window SVGs)
- [x] Added a "Skip to content" link + `#main-content` landmark
- [x] `aria-label`s on desktop vs. mobile nav (`<nav>` regions), `aria-label` on the search input
- [x] Explicit `focus-visible` rings added to every custom-styled link/button that wasn't already using a shadcn primitive (header/footer nav, domain cards, project card action links, contact links, search input)
- [x] Heading hierarchy checked per page (single `h1`, `h2` per section)
- [x] `tsc --noEmit`, `next build`, and `npm run lint` all clean
- [~] Responsive breakpoints — Tailwind classes in place (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`, `hidden sm:flex` / `flex sm:hidden` nav) but **not visually verified on an actual mobile viewport**: the in-session browser automation's window-resize tool didn't change the tab's real `window.innerWidth` (confirmed via JS — stayed at 1470px after resizing to 414px), so this needs a manual check in a real mobile browser or devtools device toolbar before calling it done.
- [x] Commit: a11y + refactor pass

## Phase 4 — Motion Pass
- [x] `MotionGrid`/`MotionItem` primitives (Motion/Framer Motion, `whileInView` + stagger) applied to every card grid: home stats/domains/featured, `/projects` domain grid, `/projects/[domain]` subcategory grids, live search results
- [x] CSS-only hover lift (`-translate-y-1`) + active tap scale (`0.98`) on domain cards and project cards — kept as plain CSS transitions (not JS) since it's cheaper and doesn't need the animation library
- [x] Verified in browser: stagger-on-scroll fires correctly, hover lift confirmed
- [x] `tsc --noEmit`, `next build`, `npm run lint` all clean
- [x] Commit: motion pass

## Phase 5 — QA
- [x] `next build` clean, `npm run lint` clean, `tsc --noEmit` clean (re-verified)
- [x] Every internal route curl-checked and returns 200 (`/`, `/projects`, all 7 `/projects/[domain]`, `/about`, `/contact`, `/resume.pdf`)
- [x] Every external link in the data layer verified: all 43 constructed GitHub repo URLs return 200, all 14 explicit live-demo/paper links from the resume PDF return 200 — nothing fabricated, nothing broken
- [x] Manual click-through in browser (desktop): nav, project detail dialog (tested full NexusGuard case study), domain drill-down, live client-side search (tested "graph" → 4 correct results), about, contact
- [x] Browser console checked after fresh page load — no errors or warnings, only expected dev-mode HMR/DevTools messages
- [~] Mobile viewport — **not independently verified** this session (see Phase 3 note: the browser automation's resize tool didn't actually change the tab's viewport). Tailwind responsive classes are in place and are standard patterns, but a real device/DevTools check is still recommended before treating this as fully QA'd.
- [x] Commit: QA pass / v1 complete

## v1 status: feature-complete, unverified on mobile viewport
Everything in Phases 0–5 above is implemented, committed, and passing every automated check available in this session. The one open item is a real mobile-viewport check — flagging it rather than claiming something that wasn't actually confirmed.

## Not started (needs explicit go-ahead first)
- [ ] Deployment (GitHub Pages / Vercel)
- [ ] Custom domain
- [ ] Design refresh once user provides their own design direction
