# Build Chat Log

Running record of the conversation and actions during this portfolio build. Appended to as the build progresses, committed alongside code changes.

---

## Session 1 — 2026-07-23

### User's opening request (verbatim)
> '/Users/saii/Desktop/portfolio/Portfolio Building Strategy.pdf' i want to build a portfolio webpage for my selft based on that i had some research and put in the file , i don't know if that is the correct plan, if there is another better strategy which is better that this u follow that and let me know, /Users/saii/Desktop/All-resumes/Purna-Reddy-Resume.pdf this is my resume, my gitprofile link is mentioned in my resume and tell me all the u need to build my portfolio webpage, now while building the webpage maintain detailed the prgress report of how many things that are implemented , also commit to git at each step, also maintain another for future plan, also store all the chat history in a file that is done during the build process, u just build the portfolio webpage later on i will tell u the design plan of how i want my webpage to be, u can take this webpage http://dhanyathacorry.me/ as the reference , do replicate this idea but just get grasp of how the portfolio webpage should work /Users/saii/Downloads/PLAN.md this is the plan that is follwed for the dhanyath webpage, based u come up with a uniqu plan and record this build plan in a serperate file, u can extract all the project and repositories from my github profile , if u need anything else just let me know

### Research performed
1. Read `Portfolio Building Strategy.pdf` (15 pages) — content-first workflow, Bento Grid spatial system, Next.js/Tailwind/shadcn/Framer Motion stack, 5-phase roadmap, common AI-generated-code pitfalls and mitigations.
2. Read `Purna-Reddy-Resume.pdf` — full bio, skills, 5 flagship projects (NexusGuard, AbstractMind-Research, VigilCore, SentinelOS, AgentForge) with metrics, 11 other live projects, 2 work experiences, 5 research/publication entries, achievements, GitHub `purna-reddy6`, LinkedIn `purna-reddy`.
3. Read `/Users/saii/Downloads/PLAN.md` — the build plan behind the reference site (dhanyathacorry.me): skill-map-by-domain concept, 7 domains, project pooling across multiple GitHub accounts, hosting/deployment tiering.
4. Scraped `github.com/purna-reddy6` repositories (2 pages, 43 repos total) — names, descriptions, languages.
5. Visited `http://dhanyathacorry.me/` live in Chrome to understand UX patterns (not to copy the visual design): decode/scramble-text hero animation, Bento-style project overview with domain cards, color-coded per-domain drill-down pages with a dotted mind-map connecting subcategories to individual repos, project detail modal (name, tag, description, tech, metrics pill, Live Demo/GitHub buttons).

### Decisions made and communicated to the user
- The strategy PDF's approach (content-first, Bento grid, Next.js/TS/Tailwind/shadcn/Framer Motion) is sound and mostly being followed as-is.
- Two deviations: (1) using domain drill-down pages instead of one flat Bento grid for the 43-project catalog, since a flat grid doesn't scale to that volume; (2) deferring Spline/Rive/3D and kinetic mouse-tracking effects to `FUTURE_PLANS.md` to ship a fast, stable v1 first.
- Recorded the full plan in `BUILD_PLAN.md`, a running checklist in `PROGRESS.md`, and deferred ideas in `FUTURE_PLANS.md`.
- Will not push to any GitHub remote or deploy anywhere without explicit go-ahead in chat first — local commits only until then.

### Next actions
Scaffold the Next.js project (Phase 0) and begin the content-first data layer (Phase 1).

### Phase 0 execution
- Moved strategy PDF into `docs/`, copied resume PDF into `docs/` too, `git init`.
- Committed planning baseline (BUILD_PLAN.md, PROGRESS.md, FUTURE_PLANS.md, CHAT_LOG.md).
- Scaffolded Next.js 16 (App Router) + TypeScript + Tailwind v4 + ESLint into the repo root (scaffolded in a scratch dir first since `create-next-app` refuses non-empty directories, then merged in).
- Installed shadcn/ui (button, card, badge, dialog, separator, navigation-menu) and `motion` (Framer Motion's current package).
- Verified `next build` on the bare scaffold. Committed.

### Phase 1 execution
- Extracted the resume's actual embedded hyperlink URLs with PyMuPDF (`fitz`) instead of guessing — got real GitHub repo links and real live-demo URLs (mostly `*.vercel.app` and two `purna-reddy6.github.io` sites) tied to each labeled link in the PDF.
- Built the content-first data layer in `src/data/`: `profile.ts`, `skills.ts`, `experience.ts` (experience + achievements + publications), `domains.ts` (7 domains with distinct accent colors), `projects.ts` (all 43 GitHub repos assigned to a domain + subcategory, 5 flagship projects given full Problem/Approach/Outcome case studies from the resume's Key Projects section, remaining 38 given concise taglines sourced from the resume's "Other Live Projects" list where available and from the live GitHub repo descriptions otherwise).
- Copied the resume PDF into `public/resume.pdf` for the site's own download link.
- `tsc --noEmit` clean.
- Next: layout architecture (Phase 2) — nav/footer, hero, projects domain overview + drill-down, about, contact.

### Phase 2 execution
- Built `SiteHeader`/`SiteFooter`, and the homepage hero as a Bento-style grid (name/tagline/intro + 4 stat tiles + quick links), a domain-grid preview, and a "Featured work" grid of the 5 flagship projects.
- Built `/projects` (domain overview + live client-side search across all 43 projects) and `/projects/[domain]` (grouped-by-subcategory listing, color-coded per domain, statically generated via `generateStaticParams` for all 7 domains) — this is the domain drill-down pattern from `BUILD_PLAN.md`, inspired by (not copied from) the reference site's mind-map UX.
- Built a single reusable `ProjectCard` (shadcn Dialog-based): flagship projects render the full Problem/Approach/Outcome case study, others render tagline + tech + links — matches the "every card opens a lightweight detail modal, no dead ends" guidance from the strategy PDF.
- Built `/about` (skills matrix, dotted-line experience timeline, achievements, publications with the real extracted links) and `/contact` (plain link list + resume download — no data-collecting form, since that would need explicit sign-off per the safety rules this build follows).
- Learned along the way: this shadcn/ui setup uses Base UI primitives (not Radix) — `Button` takes a `render` prop instead of `asChild`, so header/footer links use `buttonVariants()` directly on `<a>`/`<Link>` instead.
- Verified with `tsc --noEmit` and `next build` (all 7 domain pages prerendered statically), then manually clicked through every route and the project dialog in a live Chrome tab — nav, domain drill-down, project modal (tested NexusGuard's full case study), about, and contact all render correctly.
- Next: Phase 3 — accessibility/semantic-HTML pass and a genuine responsive check (the in-session browser's window-resize didn't visibly change the captured screenshot, so mobile layout needs a proper check next, not just trusting the Tailwind breakpoints).

### Phase 3 execution
- Removed the unused default `create-next-app` SVG assets from `public/` (confirmed via grep that nothing referenced them after the homepage rewrite).
- Added a "Skip to content" link and `#main-content` landmark, `aria-label`s distinguishing the desktop vs. mobile `<nav>` regions, and `focus-visible` ring styles on every custom-styled interactive element that wasn't already a shadcn primitive (nav links, footer links, domain cards, project-card action links, contact rows, search input) — shadcn's own components (Button, Dialog, Badge) already ship focus-visible styling.
- Tried to verify responsive breakpoints in the live browser tab by resizing the window to a phone-sized viewport (414x896) — confirmed via `window.innerWidth` in the page's own JS console that the resize tool did not actually change the tab's rendered viewport in this session (stayed at 1470px both times, before and after). Documented this as an open item in `PROGRESS.md` rather than claiming a verification that didn't actually happen — the Tailwind responsive classes are in place and are standard, well-tested patterns, but a real mobile-viewport check is still owed before calling responsiveness done.
- `tsc --noEmit`, `next build`, and `npm run lint` all clean.
- Next: Phase 4 — motion pass (Framer Motion hover/tap states, staggered reveals), then Phase 5 QA.
