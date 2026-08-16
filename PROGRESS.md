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

## Session 2 (2026-07-26)
- [x] Updated `public/resume.pdf` with the latest resume from `/Users/saii/Desktop/All-resumes/Purna-Reddy-Resume.pdf` (confirmed by SHA-256 that content had actually changed before copying)
- [x] Pushed the full repo history to `https://github.com/purna-reddy6/portfolio` (`main` branch) — user authenticated via `gh auth login` (device code flow), `git` configured to use it as credential helper
- [x] Created Vercel project `purna-reddys-projects/portfolio`, connected it to the GitHub repo (user completed the GitHub App authorization in the Vercel dashboard), confirmed via `vercel git connect` → "already connected to your project"
- [x] First production deployment shipped and verified live: `https://portfolio-zeta-rosy-96.vercel.app` (`/`, `/resume.pdf`, `/projects/ai-security` all curl-checked 200)
- [x] Future pushes to `main` will now auto-deploy to Vercel (standard behavior once a project is Git-connected) — no more manual `vercel --prod` needed for routine content changes
- [x] Confirmed `.vercel/` and `.env.local` (holds a Vercel OIDC token) stay out of git — already covered by the existing `.gitignore`

## Session 3 (2026-08-16) — Design System v2: pixel/fire redesign
User supplied a real design this time: a hero slide built in Claude Design ("Portfolio Background"), shared via a `claude.ai/design/p/...` link. Asked to (1) restyle the *entire* site to match it and (2) make every page a single no-scroll 100dvh "slide" (confirmed: separate routes stay, each is one full-screen view).

- [x] Pulled the design source: WebFetch couldn't authenticate to the `claude.ai/design/...` URL, so opened it in the user's own logged-in Chrome via browser automation, used Share → Export → Project HTML (zip) to get the real source instead of eyeballing screenshots. Sandbox couldn't read `~/Downloads` (macOS permission), user moved the file into `docs/` manually.
- [x] Extracted the real design system from `Portfolio Background.dc.html`: Silkscreen + JetBrains Mono fonts, red `#fc0201` / cream `#fff8f0` / dark `#120400` palette, CRT scanline overlay, two-tier headline, numbered "Selected Work" list, blinking-cursor contact line.
- [x] Re-encoded the animated background: source GIF was 360 frames / 14MB — converted to H.264 MP4 via ffmpeg (~865KB) plus a static poster JPG for the `prefers-reduced-motion` fallback and video `poster`. (Also found and discarded an unrelated leftover asset — a "Tech Roast" tour-poster mp4 — that had gotten bundled into the same export by mistake.)
- [x] Cleaned up: deleted the 42MB raw export bundle after pulling what was needed, kept only a 5KB `docs/design-source-reference.dc.html` for reference.
- [x] Built shared chrome in the root layout: `PixelBackground` (video + poster + scanlines) and `PixelNav` (Work/About/Contact/Resume, conditional Home link) — every route gets the same treatment automatically.
- [x] Rebuilt every page as a single no-scroll 100dvh slide:
  - `/` — the hero itself, adapted: real name/tagline, 7 domains + "All Projects" as the 8-item numbered work list, real email with blinking cursor
  - `/projects` — domains in the same numbered-list format + compact search
  - `/projects/[domain]` — compact numbered project list grouped by subcategory (stress-tested on Full Stack Web, the largest domain at 10 projects — fits with room to spare)
  - `/about` — bio pinned + an in-slide tab switcher (Skills/Experience/Achievements/Research) instead of a long scroll
  - `/contact` — compact contact list + resume button
- [x] Restyled the project-detail modal (shadcn Dialog) to match: dark/cream/mono, kept the existing Problem/Approach/Outcome structure
- [x] Dropped per-domain color-coding in favor of the design's own numbered-list convention (matches the source instead of inventing a new visual language)
- [x] Removed now-unused code: old `SiteHeader`/`SiteFooter`/`DomainCard`/`motion-primitives` components, the `motion` npm dependency, default Bento-grid styling
- [x] `tsc --noEmit`, `next build`, `npm run lint` all clean
- [x] Manually clicked through every route in Chrome (home, projects, full-stack domain page, project modal, about with all 4 tabs, contact) — all render correctly, video/scanlines/fonts working, no console errors
- [x] Committed and pushed — auto-deployed to Vercel, confirmed live (new deployment "Ready" within ~30s of push)

## Session 3b (2026-08-16) — background quality fix
User flagged that the compressed background looked noticeably worse than the original. Root cause: first encode had downscaled 1152×648 → 960px width *and* used CRF 28 (fairly aggressive for x264) — both avoidable losses.
- [x] Re-extracted the source GIF from the original export (had to ask the user to move the zip from Downloads into `docs/` a second time, since it was deleted after the first extraction)
- [x] Re-encoded at full native resolution (no scale filter) with CRF 16, `-preset slower`, and `-tune animation` (better for flat-color pixel art than the default psy-visual tuning) — ~4.9MB, visibly crisper on inspection (zoomed screenshot comparison of the "COMMIT PUSH" sign and character sprites)
- [x] Regenerated the poster JPG directly from the source GIF at full resolution and higher JPEG quality
- [x] Re-verified: `tsc --noEmit`, `next build`, `npm run lint` clean; visually confirmed in browser
- [x] Committed and pushed

## Session 3c (2026-08-16) — remove the animated background entirely
User asked to remove "the commit and push animation from the top and keep it in the same color." Confirmed scope: remove the whole video (top scene + fire strip), keep the same flat red.
- [x] `PixelBackground` now renders just the flat `#fc0201` color + the CRT scanline overlay — no video/poster
- [x] Deleted `public/pixel-fire-bg.mp4` and `public/pixel-fire-bg-poster.jpg` (confirmed unreferenced first)
- [x] Verified: `tsc --noEmit`, `next build`, `npm run lint` clean; visually confirmed in browser
- [x] Committed and pushed

## Not started (needs explicit go-ahead first)
- [ ] Custom domain
- [ ] Push this redesign live (pending — will push to `main` once committed, which auto-deploys to Vercel per the existing Git connection)
