# Future Plans / Deferred Ideas

Things deliberately not in v1 (or not in the current design v2), with why, so nothing gets lost.

## Superseded by the 2026-08-16 redesign (kept for history, no longer active plans)
The original "Design" section below was written for the first neutral dark Bento-grid build. The user has since supplied a real design (Claude Design "Portfolio Background" — pixel/fire, Silkscreen + JetBrains Mono, single-slide-per-page) and the whole site was rebuilt to match it. That old design is still in git history (through commit `a21090f`) if ever wanted again. Superseded items: Kinetic Typography, Spline 3D, Rive, dark/light theme toggle — none of these apply to the current pixel aesthetic and would need to be reconsidered from scratch if revisited.

## Design v2 (pixel/fire) — deferred ideas
- **Alternate fire palettes** — the original Claude Design file defined `fireColor` as a togglable prop (`red` #fc0201 default, `inferno` #e2260a, `ember` #c21a08). Only `red` is wired into the live site; adding a palette switcher (or per-domain color) is a natural follow-up.
- **WebM background variant** — shipped the background as H.264 MP4 only (~4.9MB, full 1152×648 resolution, CRF 16 + `-tune animation`, down from a 14MB source GIF). First pass over-compressed it (960px width + CRF 28) and visibly hurt quality — re-encoded at native resolution and near-lossless CRF per user feedback; prioritize clarity over file size for this asset going forward. A VP9 WebM alongside it via `<source>` would still shave bytes for browsers that support it; skipped for now since the ffmpeg VP9 encode kept failing in this environment.
- **About page tab content overflow** — each tab panel has `overflow-y-auto` as a pragmatic fallback in case content doesn't fit some smaller viewport; worth a real check once mobile viewport testing is possible (see gap below) and tightening spacing further if needed.
- **Individual project detail routes** (`/projects/[domain]/[slug]`) — still using an in-page modal for project detail; a dedicated route is worth it if per-project SEO or deep-linking becomes a goal.

## Content
- Tier-based live demo deployment for the flagship projects (mirroring the tiering idea in the reference PLAN.md: static repos → GitHub Pages, React/TS repos → Vercel, backend repos → a hosting credit) — not started, needs the user's own hosting accounts/credits and explicit go-ahead.
- Blog / notes section if the user wants to publish write-ups of the research papers.

## Infra
- Custom domain — not set up yet, needs the user's domain/registrar details and explicit go-ahead.
- Analytics (privacy-respecting, e.g. Plausible/Umami) if the user wants visit data.
- Automated CI (lint/build check on push) — the repo now has a remote (`github.com/purna-reddy6/portfolio`) and Vercel auto-deploys on push; a separate GitHub Actions lint/build gate isn't set up yet.

## Open questions for the user (not blocking, but worth answering eventually)
- Should individual projects get real live demos, or is "GitHub + good README" enough for most (per the reference PLAN.md's tiering)? (Many already have real live demo links pulled from the resume PDF.)
- Any projects from the 43 that should be hidden/archived rather than shown?
- Want a fire-color or theme switcher exposed on the site itself, or keep it fixed to red?

## Known gap to close before calling this fully verified
- **Mobile-viewport check** — the in-session Chrome automation's window-resize tool has never actually changed the tab's real viewport in any session so far (confirmed via `window.innerWidth` staying at desktop width after resizing). The single-slide layouts use `clamp()` sizing and should scale down reasonably, but this needs a real phone or devtools device-toolbar check before being called done — same open item as before the redesign, still unresolved.
