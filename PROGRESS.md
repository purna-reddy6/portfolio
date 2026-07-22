# Build Progress

Legend: [x] done · [~] in progress · [ ] not started

## Phase 0 — Project Setup
- [x] Reviewed strategy PDF, resume, GitHub profile, reference site
- [x] Wrote `BUILD_PLAN.md` (unique plan for this build)
- [x] `git init`, organized `docs/`
- [ ] Scaffold Next.js + TypeScript + Tailwind + ESLint app
- [ ] Install shadcn/ui, Framer Motion
- [ ] Initial scaffold commit

## Phase 1 — Content Compiling
- [ ] `data/profile.ts` — bio, tagline, education, contact links
- [ ] `data/skills.ts` — grouped skill matrix from resume
- [ ] `data/experience.ts` — work experience + timeline
- [ ] `data/achievements.ts` + `data/publications.ts`
- [ ] `data/projects.ts` — all 43 GitHub repos, tagged by domain, 5 flagship case studies with Problem/Approach/Outcome + metrics
- [ ] `data/domains.ts` — 7 domain definitions (name, color, description, subcategories)
- [ ] Commit: content layer

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
