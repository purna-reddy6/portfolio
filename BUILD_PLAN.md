# Build Plan — Purna Sainath Reddy V Portfolio

## Addendum: Design System v2 (2026-08-16) — pixel/fire redesign

User designed a hero slide in Claude Design (`docs/design-export/Portfolio Background.dc.html`, shared via `claude.ai/design/p/6171cd02-...`) and asked to restyle the **entire site** to match it, with every page rebuilt as a **single no-scroll 100dvh "slide"** (confirmed: separate routes stay, but each route is one full-screen view, not a scrolling page).

**Source design, extracted directly from the exported project file:**
- Fonts: `Silkscreen` (700, pixel display font) for headlines/labels, `JetBrains Mono` for nav/body/mono text
- Palette: red `#fc0201` background, cream `#fff8f0` / translucent cream for text, near-black `#120400` for the bold headline tier
- Full-bleed animated background: pixel-art office-chair "commit/push" scene with an animated fire strip along the bottom (360-frame GIF, re-encoded to `public/pixel-fire-bg.mp4` — the original GIF was 14MB, compressed to ~865KB H.264 via ffmpeg; a static `pixel-fire-bg-poster.jpg` serves as the `prefers-reduced-motion` fallback and video poster)
- Optional CRT scanline overlay (repeating-linear-gradient animation)
- Layout: top-right nav, centered two-tier headline (light name / bold "Portfolio"), numbered "Selected Work" list (2-col, 8 items), contact line with blinking cursor

**How this is being applied sitewide:**
- Shared `PixelBackground` (video+poster+scanlines) and `PixelNav` (Work/About/Contact/Resume) live in the root layout so every route gets the same treatment
- Domain color-coding (the old per-domain hex accents) is dropped in favor of the design's numbered-list convention (`01`, `02`, ...) — matches the source design's own pattern instead of inventing a new one
- Each page is redesigned to fit one screen without scrolling:
  - `/` — the hero itself, adapted with real name/contact and the 7 domains + "all projects" as the 8-item work list
  - `/projects` — domain list in the same numbered format
  - `/projects/[domain]` — compact numbered project list per domain (detail still opens in a modal, which may scroll internally — that's an overlay, not the page)
  - `/about` — bio pinned + an in-slide tab switcher (Skills / Experience / Achievements / Research) rather than a long scroll
  - `/contact` — compact contact list, fits naturally
- The shadcn Dialog (project detail) is restyled to match (dark/cream/mono) but keeps its existing Problem/Approach/Outcome structure

This replaces the original neutral dark Bento-grid look built in the first pass. The old design isn't lost — it's in git history (everything up to commit `a21090f` / the resume-update and deploy commits).

## Sources consulted before writing this plan
1. `docs/Portfolio Building Strategy.pdf` — user's own research (content-first workflow, Bento Grid system, Next.js/Tailwind/shadcn stack, 5-phase roadmap).
2. `docs/Purna-Reddy-Resume.pdf` — bio, skills, 5 flagship case studies, 11 other live projects, experience, publications, achievements.
3. `github.com/purna-reddy6` — 43 public repositories, scraped for name/description/language/stars.
4. `http://dhanyathacorry.me/` (reference site) + `/Users/saii/Downloads/PLAN.md` (its build plan) — inspected live in-browser to understand UX patterns, not to copy verbatim.

## Verdict on the strategy PDF
The plan in the PDF is sound and I'm following most of it as-is:
- **Content-first workflow** (compile all copy/data before writing layout code) — keeping this, it's the right call for AI-assisted layout generation and it's how I'm structuring the build phases below.
- **Stack**: Next.js (App Router) + TypeScript + Tailwind CSS + shadcn/ui + Framer Motion — keeping this, it's a solid, current, well-supported combination.
- **A11y-first semantic structure under a visual grid** — keeping this.

Two deviations, and why:
1. **Not a pure Bento grid for the whole site.** A flat Bento grid is great for a hero/about/stats page, but this resume spans 43 projects across 7 domains — a flat grid of 43 cards is overwhelming and doesn't scale. Instead: Bento grid for the **landing hero and overview**, then a **domain drill-down flow** (domain cards → grouped project list → project detail panel) for the projects section specifically. This is the pattern the reference site uses and it's the right tool for this volume of content — the Bento formulas from the PDF still govern the *card sizing* within each screen.
2. **Deferring Spline/Rive 3D and kinetic mouse-tracking typography to a later phase** (see `FUTURE_PLANS.md`). These are real production-performance and scope risks for a v1 (WebGL bundle size, lazy-load correctness, extra dependency surface) and the PDF itself flags cumulative-layout-shift and bundle bloat as the top pitfalls of this exact kind of feature. Ship a fast, clean, fully-functional v1 first; add motion/3D polish once the content and layout are locked and the user has given design direction.

## What "get grasp" of the reference site produced (not copied)
Observed and worth reusing as *patterns*, not literal designs:
- Landing hero with name, one-line identity, tagline/quote, and a quick-nav row (Projects / GitHub / Experience / Resume) — good, minimal, and content-forward.
- A dedicated **Projects** entry point separate from the hero, with a **search box** and clickable **domain cards**.
- Domain pages are **color-coded per domain** and group projects into 2–3 named subcategories before listing individual repos — this scales far better than one long list.
- Project detail surfaces as a **compact card**: name, domain tag, one-line description, tech stack, a single metrics/highlight pill, and two links (Live Demo, GitHub).
- A small **"hot!" ticker** calling out the single most impressive achievement — cheap, high-signal, good for recruiter attention in the first few seconds.

None of the literal visuals (color values, fonts, the cat photo, the exact scramble-text animation) are being reused — this is a different person with different content and a different visual identity to be defined later.

## Site structure (v1)
- `/` — Hero (Bento-style intro grid: name, tagline, headline stats — 43 projects / 7 domains / 2 research papers, quick-nav)
- `/projects` — Domain overview (Bento cards, one per skill domain)
- `/projects/[domain]` — Grouped project list for that domain, color-coded
- Project detail — panel/modal from the list (no separate route needed for v1; revisit if SEO on individual projects becomes a goal)
- `/about` — Bio, full skills matrix, education, experience timeline, achievements, publications
- `/contact` — Email, GitHub, LinkedIn, resume download
- Global nav + footer with the same links repeated

## Content taxonomy (7 domains, all 43 repos assigned)
1. **AI Security & Cybersecurity** — NexusGuard, ChainTrace, VigilCore, CipherLab, RegressGuard, parental-AI, DNS-detective, fakenews-detection-nlp
2. **AI Research / AGI** — AbstractMind, PrimaLearn, CortexRAG, MediSage, privacy-preserving-rag-assistant
3. **Computer Vision / 3D / Edge AI** — UrbanTwin, ScanToBuild, ScanToBuild-Pro, MotionProbe, MotionProbe-RL, TemporalForge, OsteoScan, hand-gestures-navigation, HeritageGlobe
4. **Quantum Computing** — QuantumLens, VariaQ, QubitSim
5. **Data Science & Analytics** — LaunchDS, TrendScope, StockSentry, CropMind
6. **Full Stack Web** — InternScout, CodeMentorAI, EstateLens, CampusHub, CloudShift, TicketFlow, RANForge, SQL-query-generator, StorEdge, PathFinderAI
7. **AI Agents & Voice** — SentinelOS, AgentForge, OmniMind, offline-text-to-sql

The 5 resume "Key Projects" (NexusGuard, AbstractMind, VigilCore, SentinelOS, AgentForge) get the full Problem/Approach/Outcome case-study treatment with metrics. The rest get the compact card treatment, upgradeable later.

## Five-phase execution roadmap
- **Phase 0 — Project setup**: git init, Next.js + TS + Tailwind + shadcn scaffold, tooling. *(commit)*
- **Phase 1 — Content compiling**: structured TypeScript data files for bio, skills, experience, achievements, publications, and all 43 projects with domain/tags/tech/metrics/links. No UI yet. *(commit)*
- **Phase 2 — Layout architecture**: routes, Bento hero, domain overview grid, domain drill-down pages, project detail panel, about/contact pages — static, functional, no animation. *(commit per section)*
- **Phase 3 — Refactor & a11y pass**: shadcn components wired in properly, semantic HTML/landmark structure, keyboard navigation, responsive breakpoints (12-col desktop → 4-col tablet → 1-col mobile per the PDF's guidance). *(commit)*
- **Phase 4 — Motion pass**: Framer Motion for hover/tap states, page transitions, staggered reveals. *(commit)*
- **Phase 5 — QA**: production build, lint, broken-link/asset check, responsive check in an actual browser. *(commit)*

Deployment (GitHub Pages / Vercel / custom domain) is **not** started without explicit sign-off — that step publishes content under the user's name and pushes to a remote, which needs a clear go-ahead each time, not a standing one.

## Working agreements for this build
- Every phase/milestone gets a commit with a message describing what shipped.
- `PROGRESS.md` is updated alongside each commit — running checklist, not a diary.
- `FUTURE_PLANS.md` collects anything deliberately deferred (3D, animation-heavy features, deployment, design changes once the user gives direction).
- `CHAT_LOG.md` captures this build conversation as it happens.
