# PRP: {{TITLE}}

## 0) Context
- Source: {{INITIAL_PATH}}
- Goal: {{GOALS}}
- Constraints: Follow **CLAUDE.md** rules and examples in `examples/`

## 1) Scope
- In scope: {{IN_SCOPE}}
- Out of scope: {{OUT_OF_SCOPE}}

## 2) Architecture & Stack
- Next.js (App Router), React 18, TS, Tailwind, shadcn/ui
- Motion (Framer), Lenis, CSS View Transitions
- Vanta GLOBE hero (parallax; reduced‑motion fallback)
- Contact hub: Resend + Calendly + LinkedIn
- Analytics: Plausible + custom events

## 3) Implementation Plan (Validation Gates)
1. Scaffold sections & routes (Hero, MetricsBar, Projects, Timeline, Availability, ContactHub) ✓
2. Implement **Vanta GLOBE** with parallax + reduced‑motion swap ✓
3. MetricsBar with animated counters; perf‑safe ✓
4. Projects: 3 metric‑first cards + hover/focus preview ✓
5. Experience timeline (compact, accessible) ✓
6. Availability widget (slots indicator) ✓
7. ContactHub: Email (Zod+Resend+rate‑limit), Calendly embed, LinkedIn quick link ✓
8. Analytics tracker: scroll depth + click map; Plausible wired ✓
9. SEO/CSP/headers; resource hints; perf budgets ✓
10. README usage notes; env template wiring ✓

## 4) Tests & Verification
- A11y: keyboard nav, focus, reduced‑motion; color contrast AA+
- Perf: LCP/INP/CLS; initial JS size; lazy/dynamic imports verified
- SEO: metas, OG, structured data present
- Security: CSP, rate‑limit, input validation, idempotent email

## 5) Deliverables
- Code changes matching examples
- Docs + envs
- Validation notes (what passed)

## 6) Risks & Mitigations
- Animation jank → clamp DPR; disable on reduced motion; one canvas
- Deliverability → SPF/DKIM; fallback logging if Resend unset

## 7) References
- Docs from INITIAL.md
