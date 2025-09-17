'use client'
import Hero from '@/components/sections/hero'
import MetricsBar from '@/components/sections/metrics-bar'
import ProjectsShowcase from '@/components/sections/projects-showcase'
import ExperienceTimeline from '@/components/sections/experience-timeline'
import About from '@/components/sections/about'
import Contact from '@/components/sections/contact'
import { useAnalytics } from '@/hooks/useAnalytics'

export default function Home() {
  // Enable comprehensive analytics tracking
  useAnalytics()

  return (
    <main id="main-content">
      {/* Hero Section with Vanta Globe */}
      <Hero />

      {/* About Me */}
      <About />

      {/* Metrics Credibility Bar */}
      <MetricsBar />

      {/* Projects Showcase */}
      <ProjectsShowcase />

      {/* Experience Timeline */}
      <ExperienceTimeline />
      
      {/* Multi-Channel Contact */}
      <Contact />
    </main>
  )
}