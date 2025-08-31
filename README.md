# Danny Elzein Premium Developer Portfolio

A high-performance, conversion-optimized developer portfolio built with Next.js 14, TypeScript, and Tailwind CSS. Features interactive 3D globe, animated metrics, project showcases, and multi-channel contact system.

## 🚀 Features

### ⭐ Core Sections
- **Hero with Vanta Globe** - Interactive 3D background with day/night color shifts and mouse parallax
- **Metrics Bar** - Animated counters showcasing key performance indicators
- **Project Showcase** - Evidence-based case studies with quantified business impact
- **Experience Timeline** - Interactive professional journey with growth story
- **Availability Widget** - Real-time availability status with urgency indicators
- **Multi-Channel Contact** - Email, Calendly, and LinkedIn integration with tabs

### 🎨 Design & UX
- Sophisticated minimalism with strategic micro-interactions
- Magnetic buttons with subtle scale/attraction effects
- 60ms stagger reveals for smooth animations
- GPU-accelerated transforms for optimal performance
- Reduced motion support for accessibility
- Dark/light theme support

### ⚡ Performance
- **Core Web Vitals Optimized**: LCP < 1.8s, INP < 200ms, CLS ≤ 0.01
- **Bundle Size**: Initial JS ≤ 150kB with aggressive code splitting
- **Images**: AVIF/WebP with responsive loading
- **Fonts**: FOFT strategy with fallbacks
- **Edge Runtime**: Optimized for speed
- **Resource Hints**: Preconnect, prefetch, preload

### 🛡️ Security & Trust
- CSP headers with strict policies
- HTTPS/HSTS enforcement
- SRI for external resources
- Zod validation for all forms
- Token bucket rate limiting
- DOMPurify for HTML sanitization
- PII redaction in logs

### ♿ Accessibility
- WCAG 2.1 AA compliant
- Strong focus rings and skip links
- Modal focus traps
- Screen reader support
- Motion/contrast preferences
- Keyboard navigation

## 🛠️ Tech Stack

### Core
- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **Animations**: Framer Motion with FLIP patterns
- **3D Graphics**: Vanta.js GLOBE with Three.js
- **Email**: Resend API with rate limiting
- **Analytics**: Plausible with custom events
- **Validation**: Zod schemas

### Performance
- **Rendering**: SSR/ISR with Edge Runtime
- **Bundling**: Webpack with bundle analyzer
- **Images**: Next.js Image with AVIF/WebP
- **Fonts**: Google Fonts with display swap
- **Compression**: Brotli enabled

## 📁 Project Structure

```
src/
├── app/                  # Next.js App Router
│   ├── api/             # API routes (contact form)
│   ├── globals.css      # Global styles with CSS variables
│   ├── layout.tsx       # Root layout with SEO
│   └── page.tsx         # Main landing page
├── components/          # React components
│   ├── sections/        # Page sections
│   │   ├── hero.tsx            # Hero with Vanta Globe
│   │   ├── metrics-bar.tsx     # Animated metrics
│   │   ├── projects-showcase.tsx # Project case studies
│   │   ├── experience-timeline.tsx # Career timeline
│   │   ├── availability.tsx    # Availability widget
│   │   └── contact.tsx         # Multi-channel contact
│   └── ui/              # Reusable UI components
│       └── button.tsx   # Button component with variants
├── lib/                 # Utilities and helpers
│   └── utils.ts         # Class merging, formatting
└── types/               # TypeScript type definitions
    └── index.ts         # Shared types
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm/yarn/pnpm

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd danny-elzein-portfolio-website
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:

```env
# Resend Email API
RESEND_API_KEY=your_resend_api_key_here
SENDER_EMAIL=hello@yourdomain.com
OWNER_EMAIL=your@email.com

# Calendly Integration
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/yourusername

# Social Links
NEXT_PUBLIC_LINKEDIN_URL=https://linkedin.com/in/yourusername

# Analytics
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=yourdomain.com

# GitHub Stats
GITHUB_USERNAME=yourusername

# Feature Flags
ENABLE_PARALLAX=true
ENABLE_METRICS_BAR=true
ENABLE_HEATMAP=false
```

4. **Run the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

## 📜 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler
npm run analyze      # Analyze bundle size
```

## ⚙️ Configuration

### Email Setup (Resend)
1. Sign up for [Resend](https://resend.com)
2. Create an API key
3. Verify your domain
4. Add environment variables

### Analytics (Plausible)
1. Sign up for [Plausible Analytics](https://plausible.io)
2. Add your domain
3. Set `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` in environment

### Calendly Integration
1. Create a [Calendly](https://calendly.com) account
2. Set up your availability
3. Copy your scheduling URL to `NEXT_PUBLIC_CALENDLY_URL`

## 🎨 Customization

### Content Updates
- **Personal Info**: Update `src/components/sections/hero.tsx`
- **Metrics**: Modify counters in `src/components/sections/metrics-bar.tsx`
- **Projects**: Edit project data in `src/components/sections/projects-showcase.tsx`
- **Experience**: Update timeline in `src/components/sections/experience-timeline.tsx`

### Styling
- **Colors**: Edit CSS variables in `src/app/globals.css`
- **Animations**: Modify Tailwind config in `tailwind.config.ts`
- **Components**: Update shadcn/ui components in `src/components/ui/`

### Performance Tuning
- **Bundle Analysis**: Run `npm run analyze`
- **Image Optimization**: Add images to `public/` folder
- **Code Splitting**: Use dynamic imports for large components

## 🚀 Deployment

### Vercel (Recommended)
1. Push to GitHub/GitLab/Bitbucket
2. Connect to [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy automatically

### Other Platforms
- **Netlify**: Configure build command `npm run build`
- **Cloudflare Pages**: Set Node.js compatibility
- **AWS Amplify**: Configure build settings

## 📊 Performance Monitoring

### Core Web Vitals
- Monitor LCP, INP, CLS in production
- Use Google PageSpeed Insights
- Check Lighthouse scores regularly

### Analytics Events
- Scroll depth tracking
- Click heatmap data
- Form completion rates
- Contact method preferences

## 🔒 Security Considerations

### Content Security Policy
- Strict CSP headers configured
- Inline scripts limited
- External resources whitelisted

### Rate Limiting
- Contact form: 5 requests/minute per IP
- Token bucket algorithm
- Configurable limits

### Data Protection
- No client-side PII storage
- Server-side validation
- Email template sanitization

## 🧪 Testing

### Manual Testing Checklist
- [ ] Hero globe loads and responds to mouse
- [ ] Metrics animate on scroll
- [ ] Project cards show hover effects
- [ ] Timeline reveals progressively
- [ ] Availability updates dynamically
- [ ] Contact form submits successfully
- [ ] Calendly embed loads
- [ ] LinkedIn link opens correctly
- [ ] Reduced motion respects preferences
- [ ] Mobile responsive on all devices
- [ ] Core Web Vitals pass thresholds

### Performance Testing
```bash
# Lighthouse CI
npx lighthouse-ci autorun

# Bundle analysis
npm run analyze

# Type checking
npm run type-check
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Vanta.js** for the beautiful 3D globe effect
- **shadcn/ui** for the excellent component library
- **Next.js team** for the incredible framework
- **Tailwind CSS** for the utility-first approach
- **Resend** for reliable email delivery

---

**Built with ❤️ by Danny Elzein** | [LinkedIn](https://linkedin.com/in/dannyelzein) | [Portfolio](https://dannyelzein.com)