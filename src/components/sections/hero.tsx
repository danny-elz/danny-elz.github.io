'use client'

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { useTheme } from 'next-themes'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/ui/theme-toggle'

function useIsReduced() {
  return typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
}

function getGlobeColor(isDark: boolean) {
  try {
    if (isDark) {
      return 0x3b82f6 // Blue for dark mode
    }
    const hour = new Date().getHours()
    return hour >= 19 || hour < 6 ? 0x22c55e : 0x0ea5e9
  } catch { 
    return isDark ? 0x3b82f6 : 0x0ea5e9
  }
}

interface MagneticButtonProps {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  variant?: 'default' | 'outline'
  className?: string
}

function MagneticButton({ children, href, onClick, variant = 'default', className }: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  
  useEffect(() => {
    const button = buttonRef.current
    if (!button) return
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      
      button.style.transform = `translate3d(${x * 0.1}px, ${y * 0.1}px, 0) scale(1.02)`
      button.style.transition = 'transform 60ms ease-out'
    }
    
    const handleMouseLeave = () => {
      button.style.transform = 'translate3d(0, 0, 0) scale(1)'
      button.style.transition = 'transform 200ms ease-out'
    }
    
    button.addEventListener('mousemove', handleMouseMove)
    button.addEventListener('mouseleave', handleMouseLeave)
    
    return () => {
      button.removeEventListener('mousemove', handleMouseMove)
      button.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])
  
  const ButtonComponent = href ? 'a' : 'button'
  
  return (
    <Button
      ref={buttonRef}
      as={ButtonComponent}
      href={href}
      onClick={onClick}
      variant={variant}
      className={cn(
        'transition-transform duration-200 ease-out will-change-transform',
        'hover:shadow-lg active:scale-[0.98]',
        className
      )}
    >
      {children}
    </Button>
  )
}

interface HeroProps {
  className?: string
}

export default function Hero({ className }: HeroProps) {
  const vantaRef = useRef<HTMLDivElement>(null)
  const [effect, setEffect] = useState<any>(null)
  const { resolvedTheme } = useTheme()
  const isReduced = useIsReduced()
  const isDark = resolvedTheme === 'dark'
  
  // Initialize Vanta Globe effect
  useEffect(() => {
    if (!vantaRef.current || isReduced) return
    
    let vantaEffect: any
    
    const initVanta = async () => {
      try {
        const GLOBE = (await import('vanta/dist/vanta.globe.min')).default
        vantaEffect = GLOBE({
          el: vantaRef.current!,
          THREE,
          color: getGlobeColor(isDark),
          backgroundAlpha: 0.0,
          size: 1.0,
          spacing: 18.0,
          mouseControls: true,
          touchControls: true,
        })
        setEffect(vantaEffect)
      } catch (error) {
        console.warn('Vanta effect failed to load:', error)
        // Fallback: show gradient background
        if (vantaRef.current) {
          vantaRef.current.className += ' bg-gradient-to-br from-blue-500/10 via-green-500/5 to-blue-600/10'
        }
      }
    }
    
    initVanta()
    
    return () => {
      if (vantaEffect) {
        try {
          vantaEffect.destroy()
          setEffect(null)
        } catch (error) {
          console.warn('Error destroying Vanta effect:', error)
        }
      }
    }
  }, [isReduced]) // Remove isDark from dependencies
  
  // Update globe color when theme changes (without reinitializing)
  useEffect(() => {
    if (effect && !isReduced) {
      try {
        effect.setOptions({
          color: getGlobeColor(isDark)
        })
      } catch (error) {
        console.warn('Error updating Vanta globe color:', error)
      }
    }
  }, [effect, isDark, isReduced])
  
  // Subtle mouse parallax effect
  useEffect(() => {
    if (isReduced || !vantaRef.current) return
    
    const element = vantaRef.current
    
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth: w, innerHeight: h } = window
      const dx = (e.clientX - w / 2) / w
      const dy = (e.clientY - h / 2) / h
      
      element.style.transform = `translate3d(${dx * 6}px, ${dy * 6}px, 0)`
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [isReduced])
  
  return (
    <section 
      className={cn(
        'relative min-h-[100vh] overflow-hidden',
        className
      )}
      aria-label="Hero section"
    >
      {/* Skip link for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded"
      >
        Skip to main content
      </a>
      
      {/* Vanta Globe Background - Fixed throughout site */}
      <div 
        ref={vantaRef} 
        className="fixed inset-0 -z-50 will-change-transform"
        aria-hidden="true"
      />
      
      {/* Fallback gradient for reduced motion */}
      {isReduced && (
        <div 
          className="fixed inset-0 -z-50 bg-gradient-to-br from-blue-500/10 via-green-500/5 to-blue-600/10"
          aria-hidden="true"
        />
      )}
      
      {/* Theme Toggle */}
      <div className="absolute top-6 right-6 z-20">
        <ThemeToggle />
      </div>
      
      {/* Hero Content */}
      <div className="relative z-10 flex min-h-[100vh] items-center justify-center px-6">
        <div className="text-center max-w-4xl mx-auto p-6 rounded-3xl backdrop-blur-md bg-background/20 dark:bg-background/10 border border-white/10 dark:border-white/20">
          {/* Live Status Badge */}
          <div className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" aria-hidden="true" />
            <span>Available for projects</span>
          </div>
          
          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4">
            <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Systems that scale
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-green-500 to-blue-600 bg-clip-text text-transparent">
              beyond expectations
            </span>
          </h1>
          
          {/* Subheadline with Social Proof */}
          <div className="mb-8 space-y-2">
            <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" aria-hidden="true" />
            <p className="text-lg md:text-xl text-muted-foreground font-medium">
              Systems engineered for measurable impact
            </p>
          </div>
          
          {/* Call-to-Action Buttons */}
          <div className="mb-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <MagneticButton
              href="#projects"
              variant="outline"
              className="text-base px-6 py-3"
            >
              View Case Studies
            </MagneticButton>
            <MagneticButton
              href="#contact"
              className="text-base px-6 py-3 bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600"
            >
              Book Strategy Call →
            </MagneticButton>
          </div>
          
          {/* Technology Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-sm font-medium text-muted-foreground">
            <span className="text-xs text-muted-foreground/70 mb-2 w-full">Trusted by:</span>
            {['Python', 'AWS', 'Next.js', 'Docker', 'K8s'].map((tech) => (
              <span 
                key={tech}
                className="px-3 py-1 border border-border/50 dark:border-border/30 rounded-full bg-background/50 dark:bg-background/20 backdrop-blur-sm hover:border-border dark:hover:border-border/50 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce" aria-hidden="true">
        <div className="w-6 h-10 border-2 border-muted-foreground/30 dark:border-muted-foreground/40 rounded-full">
          <div className="w-1 h-3 bg-muted-foreground/50 dark:bg-muted-foreground/60 rounded-full mx-auto mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  )
}