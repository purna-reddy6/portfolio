# Future Plans / Deferred Ideas

Things deliberately not in v1, with why, so nothing gets lost.

## Design
- **User's own design plan** — user said they'll provide their own design direction later. v1 ships with a clean, original, functional design so there's a live baseline to react to, not a blocker on decisions.
- **Kinetic Typography** (mouse/scroll-reactive hero text) — nice touch from the strategy PDF, deferred until layout is locked.
- **Spline 3D scenes** — WebGL bundle size + lazy-load correctness is real risk for a v1; add once core site is stable and only if it earns its performance cost.
- **Rive vector state machines** — same reasoning as Spline; revisit for micro-interactions once the base UI is settled.
- **Dark/light theme toggle** — PDF flags this as a common AI-generated-code breakage point (conflicting state hooks). Ship a single polished theme first; add a toggle later if wanted, tested carefully.

## Content
- Individual project detail **routes** (`/projects/[domain]/[slug]`) with full README-derived write-ups, screenshots, and embedded demo videos — v1 uses an in-page panel; worth doing if SEO per-project or deep-linking becomes a goal.
- Tier-based live demo deployment for the flagship projects (mirroring the tiering idea in the reference PLAN.md: static repos → GitHub Pages, React/TS repos → Vercel, backend repos → a hosting credit) — not started, needs the user's own hosting accounts/credits and explicit go-ahead.
- Blog / notes section if the user wants to publish write-ups of the research papers.

## Infra
- Deployment target (GitHub Pages vs Vercel) — not decided, will ask before doing anything that pushes to a remote or a live host.
- Custom domain — same, needs the user's domain/registrar details and explicit go-ahead.
- Analytics (privacy-respecting, e.g. Plausible/Umami) if the user wants visit data.
- Automated CI (lint/build check on push) once the repo has a remote.

## Open questions for the user (not blocking v1, but worth answering eventually)
- Preferred visual identity (color palette, typeface, tone — playful like the reference site, or more formal/technical)?
- Should individual projects get real live demos, or is "GitHub + good README" enough for most (per the reference PLAN.md's tiering)?
- Any projects from the 43 that should be hidden/archived rather than shown?

## Known gap to close before calling v1 fully verified
- **Mobile-viewport check** — the in-session Chrome automation's window-resize tool didn't actually change the tab's real viewport (confirmed via `window.innerWidth` staying at 1470px after resizing to 414px), so the responsive Tailwind breakpoints were never visually confirmed on an actual small screen. They're standard, well-tested patterns (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`, `hidden sm:flex` nav swap), but do a real check — phone, or browser devtools device toolbar — before treating mobile as done.
