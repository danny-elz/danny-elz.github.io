'use client'
import { useEffect, useRef } from 'react'
import { trackScrollDepth, trackClick, trackSectionView, trackPerformance } from '@/lib/analytics'

// Hook for scroll depth tracking
export function useScrollTracking() {
  const trackedDepths = useRef(new Set<number>())
  
  useEffect(() => {
    let ticking = false
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollTop = window.scrollY
          const documentHeight = document.documentElement.scrollHeight - window.innerHeight
          const scrollDepth = Math.round((scrollTop / documentHeight) * 100)
          
          // Track at 25%, 50%, 75%, 100% milestones
          const milestones = [25, 50, 75, 100]
          for (const milestone of milestones) {
            if (scrollDepth >= milestone && !trackedDepths.current.has(milestone)) {
              trackedDepths.current.add(milestone)
              trackScrollDepth(milestone)
            }
          }
          
          ticking = false
        })
        ticking = true
      }
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
}

// Hook for click tracking
export function useClickTracking() {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      // Only track meaningful clicks (buttons, links, interactive elements)
      const target = event.target as HTMLElement
      const isInteractive = target.closest('button, a, [role="button"], [tabindex], input, textarea, select')
      
      if (isInteractive) {
        trackClick(event)
      }
    }
    
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])
}

// Hook for section visibility tracking with intersection observer
export function useSectionTracking(sectionName: string, threshold: number = 0.5) {
  const elementRef = useRef<HTMLElement>(null)
  const startTime = useRef<number | null>(null)
  
  useEffect(() => {
    const element = elementRef.current
    if (!element) return
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startTime.current = Date.now()
          trackSectionView(sectionName)
        } else if (startTime.current) {
          const timeSpent = Date.now() - startTime.current
          if (timeSpent > 1000) { // Only track if viewed for more than 1 second
            trackSectionView(`${sectionName}_exit`, timeSpent)
          }
          startTime.current = null
        }
      },
      { threshold }
    )
    
    observer.observe(element)
    return () => observer.disconnect()
  }, [sectionName, threshold])
  
  return elementRef
}

// Hook for performance tracking
export function usePerformanceTracking() {
  useEffect(() => {
    // Track performance metrics
    trackPerformance()
    
    // Track page visibility changes
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        // Track session duration when user leaves
        const sessionStart = performance.timing.navigationStart
        const sessionDuration = Date.now() - sessionStart
        
        if (window.plausible) {
          window.plausible('Session Duration', {
            props: { duration: Math.round(sessionDuration / 1000) }
          })
        }
      }
    }
    
    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [])
}

// Combined hook for all analytics
export function useAnalytics() {
  useScrollTracking()
  useClickTracking()
  usePerformanceTracking()
}