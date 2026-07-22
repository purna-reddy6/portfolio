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
- [ ] Global layout: nav + footer
- [ ] `/` — hero (Bento intro grid)
- [ ] `/projects` — domain overview grid
- [ ] `/projects/[domain]` — grouped project list, color-coded
- [ ] Project detail panel/modal
- [ ] `/about` — bio, skills, experience timeline, achievements, publications
- [ ] `/contact` — links + resume download
- [ ] Commit(s): layout per section

## Phase 3 — Refactor & Accessibility
- [ ] Swap raw elements for shadcn/ui primitives where it helps
- [ ] Semantic landmarks, heading hierarchy, keyboard nav check
- [ ] Responsive breakpoints (12-col → 4-col → 1-col)
- [ ] Commit: a11y + responsive pass

## Phase 4 — Motion Pass
- [ ] Framer Motion hover/tap states on cards
- [ ] Page/section transitions
- [ ] Staggered reveal on grids
- [ ] Commit: motion pass

## Phase 5 — QA
- [ ] `next build` clean, lint clean
- [ ] Manual click-through in browser (desktop + mobile viewport)
- [ ] Fix any broken links/assets found
- [ ] Commit: QA pass / v1 complete

## Not started (needs explicit go-ahead first)
- [ ] Deployment (GitHub Pages / Vercel)
- [ ] Custom domain
- [ ] Design refresh once user provides their own design direction
