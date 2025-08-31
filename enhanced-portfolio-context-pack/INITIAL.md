# INITIAL.md — Enhanced MVP Features (Danny Elzein)

## FEATURE SET (Conversion‑Optimized)

### 1) Hero (Hook)
**Content:**
```
[Live Status] • Available for projects
Systems that scale beyond expectations
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Reduced cloud costs 67% for Fortune 500s
[View Case Studies] [Book Strategy Call →]
Trusted by: Python • AWS • Next.js • Docker • K8s
```
**Visuals:**
- Vanta **GLOBE** with day/night color shift (user timezone)
- Subtle mouse parallax; transparent over gradient; reduced‑motion → static
- Magnetic CTA buttons; progress bar

### 2) Metrics Bar (Credibility)
- Lines of code reviewed (counter)
- Systems architected (counter)
- Uptime maintained **99.99%**
- Response time **< 2 hours**

### 3) Projects (Evidence)
- **Compliance Screenshot Archiver**
  - `847,293 objects` • `0 tamper incidents in 2 years`
  - Challenge → Solution → Impact (case tile)
  - Links: **Architecture** • **Case Study**
- **Performance Transformation**
  - `2.7s → 0.4s` • `+47% conversion`
- **ML Pipeline Optimization**
  - `92% → 99.3% accuracy` • `10× throughput`

### 4) Experience Timeline (Authority)
Compact interactive timeline; one line per role; growth story.

### 5) Availability (Urgency)
Slots indicator (e.g., “2 slots in February”) + current month view.

### 6) Contact (Action)
Tabs: **Email** (Resend) | **Book** (Calendly inline) | **LinkedIn** (quick connect)

## NON‑FUNCTIONAL (Enhanced)
- Resource hints, SW (offline), Brotli, AVIF/WebP
- CSP, HSTS, SRI, token bucket, DOMPurify
- Plausible + custom events (scroll depth, click map)
- Edge runtime, ISR, streaming SSR
- a11y: skip links, focus traps, reduced‑motion

## ENVIRONMENT
- RESEND_API_KEY, SENDER_EMAIL, OWNER_EMAIL
- NEXT_PUBLIC_CALENDLY_URL
- NEXT_PUBLIC_LINKEDIN_URL
- NEXT_PUBLIC_PLAUSIBLE_DOMAIN
- GITHUB_USERNAME
- FEATURE flags: ENABLE_PARALLAX, ENABLE_METRICS_BAR, ENABLE_HEATMAP

## OUTPUT
- Next.js app per examples; email route; Calendly embed; analytics trackers; README
- Success = **CLAUDE.md** acceptance criteria pass + Lighthouse/A11y/SEO thresholds
