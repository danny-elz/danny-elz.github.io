// Analytics utilities for engagement tracking
// Implements scroll depth tracking and click heat mapping for conversion optimization

interface ClickEvent {
  x: number
  y: number
  element: string
  timestamp: number
  viewport: { width: number; height: number }
}

interface ScrollEvent {
  depth: number
  timestamp: number
  viewport: { width: number; height: number }
}

// Declare global plausible function
declare global {
  interface Window {
    plausible?: (eventName: string, options?: { props?: Record<string, any> }) => void
  }
}

// Track custom events with Plausible
export function trackEvent(eventName: string, props?: Record<string, any>) {
  if (typeof window !== 'undefined' && window.plausible) {
    window.plausible(eventName, { props })
  }
}

// Track scroll depth in quartiles (25%, 50%, 75%, 100%)
export function trackScrollDepth(depth: number) {
  const quartile = Math.floor(depth / 25) * 25
  
  // Only track at quartile milestones
  if (depth >= quartile && quartile > 0) {
    trackEvent('Scroll Depth', {
      depth: `${quartile}%`,
      viewport_width: window.innerWidth,
      viewport_height: window.innerHeight
    })
  }
}

// Track click coordinates for basic heat mapping
export function trackClick(event: MouseEvent) {
  const target = event.target as HTMLElement
  const element = target.tagName.toLowerCase()
  const id = target.id
  const className = target.className
  
  // Create element descriptor
  const elementDesc = [
    element,
    id && `#${id}`,
    className && `.${className.split(' ')[0]}`
  ].filter(Boolean).join('')

  const clickData: ClickEvent = {
    x: Math.round((event.clientX / window.innerWidth) * 100), // Convert to percentage
    y: Math.round((event.clientY / window.innerHeight) * 100),
    element: elementDesc,
    timestamp: Date.now(),
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight
    }
  }

  trackEvent('Click', {
    element: clickData.element,
    x_percent: clickData.x,
    y_percent: clickData.y,
    viewport_width: clickData.viewport.width,
    viewport_height: clickData.viewport.height
  })
}

// Track section visibility for engagement analysis
export function trackSectionView(sectionName: string, timeSpent?: number) {
  const props: Record<string, any> = {
    section: sectionName,
    viewport_width: window.innerWidth,
    viewport_height: window.innerHeight
  }
  
  if (timeSpent) {
    props.time_spent = Math.round(timeSpent / 1000) // Convert to seconds
  }
  
  trackEvent('Section View', props)
}

// Track conversion events
export function trackConversion(action: string, context?: string) {
  trackEvent('Conversion', {
    action,
    context: context || 'unknown',
    timestamp: Date.now()
  })
}

// Track performance metrics
export function trackPerformance() {
  if (typeof window === 'undefined' || !('performance' in window)) return

  // Wait for page load to complete
  window.addEventListener('load', () => {
    setTimeout(() => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
      
      if (navigation) {
        trackEvent('Performance', {
          lcp: Math.round(navigation.loadEventEnd - navigation.loadEventStart),
          fcp: Math.round(navigation.responseEnd - navigation.fetchStart),
          dom_load: Math.round(navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart),
          page_load: Math.round(navigation.loadEventEnd - navigation.fetchStart)
        })
      }

      // Track Core Web Vitals with web-vitals library
      import('web-vitals').then(({ onCLS, onFCP, onLCP, onTTFB, onINP }) => {
        onCLS?.((metric: any) => trackEvent('Core Web Vital', { 
          name: 'CLS', 
          value: Math.round(metric.value * 1000) / 1000,
          rating: metric.rating 
        }))
        onFCP?.((metric: any) => trackEvent('Core Web Vital', { 
          name: 'FCP', 
          value: Math.round(metric.value),
          rating: metric.rating 
        }))
        onLCP?.((metric: any) => trackEvent('Core Web Vital', { 
          name: 'LCP', 
          value: Math.round(metric.value),
          rating: metric.rating 
        }))
        onTTFB?.((metric: any) => trackEvent('Core Web Vital', { 
          name: 'TTFB', 
          value: Math.round(metric.value),
          rating: metric.rating 
        }))
        // Track INP (Interaction to Next Paint) - replacement for FID
        onINP?.((metric: any) => trackEvent('Core Web Vital', { 
          name: 'INP', 
          value: Math.round(metric.value),
          rating: metric.rating 
        }))
      }).catch(() => {
        // web-vitals not available, skip silently
      })
    }, 1000)
  })
}