# CLAUDE.md — Global Rules (Enhanced, Danny Elzein Portfolio)

::: YOU MUST ALWAYS USE ARCHON MCP :::

> **Project:** Premium developer portfolio for **Neural Innovation**  
> **Signature:** Sophisticated minimalism with strategic micro‑interactions that convert visitors to clients  
> **Psychology:** Trust through demonstrated competence, not claims

## 1) Tech & Architecture (Enhanced)
- **Framework/UI:** Next.js 14+ (App Router), React 18, TypeScript, Tailwind, shadcn/ui
- **Animation:** Motion (Framer Motion) with FLIP patterns, **Lenis** smooth scroll, and **CSS View Transitions API** where supported
- **3D/Background:** Vanta.js **GLOBE** with subtle mouse parallax and performance‑adaptive quality; reduced‑motion = static gradient
- **Content:** MDX (Notes pages) with syntax highlighting (Shiki) and reading‑time
- **Contact:** Multi‑channel: Resend (email) + **Calendly** inline + **LinkedIn** quick connect
- **Analytics:** **Plausible** + custom engagement tracking (scroll depth, click coordinates for basic heat mapping)
- **Performance:** Edge runtime where possible, ISR for notes, streaming SSR for home sections
- **Trust Signals:** GitHub contribution graph (lightweight embed), real‑time availability status (slots indicator)

## 2) Information Architecture (Strategic, Conversion‑Optimized Flow)
1. **Hook (Hero)** — Immediate value proposition + social proof
2. **Credibility (Metrics Bar)** — Live counters / stats
3. **Evidence (Projects)** — Results‑driven case tiles with metrics
4. **Authority (Experience)** — Growth timeline, compact & scannable
5. **Urgency (Availability)** — Limited slots indicator
6. **Action (Contact)** — Multiple low‑friction paths

## 3) Copy & Content Strategy
- **Hero:** Headline ≤7 words; Subline ≤10 words; microcopy may add exclusivity/time‑sensitivity.
- **Projects:** Impact metric (animated counter), 1‑line business context, subtle tech indicators, optional testimonial/usage stat.
- **Experience:** One line per role; timeline visualization.
- **Contact:** Clear prompts; email + Calendly + LinkedIn.

## 4) Motion & Interaction (Conversion Psychology)
- Magnetic buttons (subtle scale/attraction), progress/reading indicators, 60ms stagger reveals, tactile press states (scale 0.98), **GPU‑accelerated transforms only**.
- Persist user preferences (theme/motion) across sessions.
- **Reduced motion:** disable Vanta, parallax, counters, and hover videos.

## 5) Performance Targets
- **LCP < 1.8s**, **INP < 200ms**, **CLS ≤ 0.01**, **TTI < 2.5s on 3G**
- Initial JS ≤ **150 kB** (aggressive splitting); use Edge runtime if feasible
- Fonts: FOFT with fallbacks; AVIF/WebP images; Brotli; resource hints (preconnect/prefetch/preload)

## 6) Accessibility Plus
- Strong focus rings; skip links; modal focus traps; recognizes motion/contrast/data‑saver; inline validation with helpful messages; skeletons that match layout.

## 7) SEO & Discoverability
- Schemas: Person, SoftwareApplication (for products), Review (optional); dynamic OG with project metrics; semantic sections; CI‑gated budgets; optional hreflang.

## 8) Security & Trust
- CSP headers; HTTPS/HSTS; SRI for external; Zod validation; token‑bucket rate limit; DOMPurify for any HTML; idempotent email sending; redact PII in logs.

## 9) Do / Don’t
- **Do:** Lead with metrics; keep motion calm; one WebGL canvas; persist preferences; show live availability.
- **Don’t:** Over‑animate; add multiple canvases; bury metrics; break tab/keyboard flow.

## 10) Acceptance Criteria (Go/No‑Go)
- Hero: Vanta **GLOBE** (parallax), reduced‑motion swap, no layout shift; headline ≤7, subline ≤10.
- Metrics Bar: animated counters that ease in on visibility; CPU/GPU‑safe.
- Projects: exactly **3** metric‑first tiles; hover/focus preview loop; testimonial/usage proof optional.
- Experience: interactive timeline; scannable on laptop.
- Availability: limited slots indicator; status updates without reload (poll or stale‑while‑revalidate).
- Contact: email validates + confirms to both parties; **Calendly inline** works; LinkedIn quick link visible.
- Analytics: scroll‑depth & click events captured; Plausible wired.
- Budgets: Perf targets met; a11y checks pass; SEO basics correct.

## 11) Examples to Prefer
- All components under `examples/` are canonical patterns. Mimic structure, a11y, and perf techniques there.
