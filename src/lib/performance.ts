// Performance optimization utilities
// Implements accessibility, reduced motion, and performance best practices

import React from 'react'

// Check if user prefers reduced motion
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// Check if user prefers high contrast
export function prefersHighContrast(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-contrast: high)').matches
}

// Check if user prefers reduced data usage
export function prefersReducedData(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-data: reduce)').matches
}

// Get connection information for adaptive loading
export function getConnectionInfo() {
  if (typeof window === 'undefined' || !('navigator' in window)) return null
  
  const nav = navigator as any
  const connection = nav.connection || nav.mozConnection || nav.webkitConnection
  
  if (!connection) return null
  
  return {
    effectiveType: connection.effectiveType,
    downlink: connection.downlink,
    rtt: connection.rtt,
    saveData: connection.saveData
  }
}

// Determine if we should use low-quality assets
export function shouldUseLowQuality(): boolean {
  const connection = getConnectionInfo()
  const reducedData = prefersReducedData()
  
  if (reducedData) return true
  if (!connection) return false
  
  // Use low quality for slow connections
  return connection.effectiveType === 'slow-2g' || 
         connection.effectiveType === '2g' || 
         connection.saveData === true
}

// Preload critical resources
export function preloadCriticalResources() {
  if (typeof window === 'undefined') return
  
  const resources = [
    { href: '/fonts/inter-var.woff2', as: 'font', type: 'font/woff2', crossorigin: 'anonymous' },
  ]
  
  resources.forEach(resource => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.href = resource.href
    link.as = resource.as
    if (resource.type) link.type = resource.type
    if (resource.crossorigin) link.crossOrigin = resource.crossorigin
    document.head.appendChild(link)
  })
}

// Lazy load component when it enters viewport
export function createLazyImport<T extends React.ComponentType<any>>(
  importFn: () => Promise<{ default: T }>
) {
  return React.lazy(importFn)
}

// Optimize images based on connection
export function getOptimizedImageProps(src: string, alt: string, priority = false) {
  const useLowQuality = shouldUseLowQuality()
  
  return {
    src,
    alt,
    priority,
    quality: useLowQuality ? 50 : 90,
    placeholder: 'blur' as const,
    blurDataURL: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=='
  }
}

// Measure and report performance metrics
export function measurePerformance(metricName: string, fn: () => void | Promise<void>) {
  const start = performance.now()
  
  const measure = () => {
    const end = performance.now()
    const duration = end - start
    
    // Report to analytics if available
    if (typeof window !== 'undefined' && window.plausible) {
      window.plausible('Performance Metric', {
        props: {
          metric: metricName,
          duration: Math.round(duration),
          timestamp: Date.now()
        }
      })
    }
    
    // Log in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`Performance: ${metricName} took ${duration.toFixed(2)}ms`)
    }
  }
  
  try {
    const result = fn()
    if (result instanceof Promise) {
      return result.finally(measure)
    } else {
      measure()
      return result
    }
  } catch (error) {
    measure()
    throw error
  }
}

// Accessibility utilities
export const a11y = {
  // Skip to main content
  skipToMain: () => {
    const main = document.getElementById('main-content')
    if (main) {
      main.focus()
      main.scrollIntoView({ behavior: 'smooth' })
    }
  },
  
  // Announce to screen readers
  announce: (message: string) => {
    const announcer = document.createElement('div')
    announcer.setAttribute('aria-live', 'polite')
    announcer.setAttribute('aria-atomic', 'true')
    announcer.style.position = 'absolute'
    announcer.style.left = '-10000px'
    announcer.style.width = '1px'
    announcer.style.height = '1px'
    announcer.style.overflow = 'hidden'
    
    document.body.appendChild(announcer)
    announcer.textContent = message
    
    setTimeout(() => {
      document.body.removeChild(announcer)
    }, 1000)
  },
  
  // Trap focus within element
  trapFocus: (element: HTMLElement) => {
    const focusableElements = element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ) as NodeListOf<HTMLElement>
    
    const firstFocusable = focusableElements[0]
    const lastFocusable = focusableElements[focusableElements.length - 1]
    
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstFocusable) {
            e.preventDefault()
            lastFocusable.focus()
          }
        } else {
          if (document.activeElement === lastFocusable) {
            e.preventDefault()
            firstFocusable.focus()
          }
        }
      }
      
      if (e.key === 'Escape') {
        element.dispatchEvent(new CustomEvent('escape-key'))
      }
    }
    
    element.addEventListener('keydown', handleKeydown)
    firstFocusable?.focus()
    
    return () => {
      element.removeEventListener('keydown', handleKeydown)
    }
  }
}