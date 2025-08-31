'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

function useCounter(target: number, duration = 1200, shouldStart = false) {
  const [value, setValue] = useState(0)
  
  useEffect(() => {
    if (!shouldStart) {
      setValue(0)
      return
    }
    
    let animationFrame: number
    const startTime = performance.now()
    
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      // Easing function (ease-out cubic)
      const easedProgress = 1 - Math.pow(1 - progress, 3)
      const currentValue = Math.floor(target * easedProgress)
      
      setValue(currentValue)
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }
    
    animationFrame = requestAnimationFrame(animate)
    
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [target, duration, shouldStart])
  
  return value
}

function useIntersectionObserver(threshold = 0.3) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { 
        threshold,
        rootMargin: '0px 0px -100px 0px' // Trigger slightly before entering viewport
      }
    )
    
    const element = ref.current
    if (element) {
      observer.observe(element)
    }
    
    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [threshold])
  
  return [ref, isVisible] as const
}

interface MetricItemProps {
  value: string | number
  label: string
  animated?: boolean
  target?: number
  shouldAnimate: boolean
  className?: string
}

function MetricItem({ value, label, animated = false, target, shouldAnimate, className }: MetricItemProps) {
  const animatedValue = useCounter(target || 0, 1200, shouldAnimate && animated)
  
  const displayValue = animated && target ? animatedValue.toLocaleString() : value
  
  return (
    <div className={cn('text-center space-y-2', className)}>
      <div className="text-2xl md:text-3xl font-bold tabular-nums tracking-tight">
        <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
          {displayValue}
        </span>
      </div>
      <div className="text-sm text-muted-foreground font-medium">
        {label}
      </div>
    </div>
  )
}

interface MetricsBarProps {
  className?: string
}

export default function MetricsBar({ className }: MetricsBarProps) {
  const [containerRef, isVisible] = useIntersectionObserver(0.3)
  
  const metrics = [
    {
      target: 1250000,
      label: 'Lines of code reviewed',
      animated: true,
    },
    {
      target: 48,
      label: 'Systems architected',
      animated: true,
    },
    {
      value: '99.99%',
      label: 'Uptime maintained',
      animated: false,
    },
    {
      value: '< 2 hours',
      label: 'Response time',
      animated: false,
    },
  ]
  
  return (
    <section 
      ref={containerRef}
      className={cn(
        'py-12 md:py-16 border-y border-border/20',
        'content-section',
        className
      )}
      aria-labelledby="metrics-heading"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-8">
          <h2 
            id="metrics-heading" 
            className="sr-only"
          >
            Performance Metrics
          </h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {metrics.map((metric, index) => (
            <MetricItem
              key={metric.label}
              value={metric.value || metric.target || 0}
              target={metric.target}
              label={metric.label}
              animated={metric.animated}
              shouldAnimate={isVisible}
              className={cn(
                'transition-all duration-700 ease-out',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              )}
              style={{
                transitionDelay: isVisible ? `${index * 60}ms` : '0ms'
              }}
            />
          ))}
        </div>
        
        {/* Visual separator */}
        <div className="mt-10 flex justify-center" aria-hidden="true">
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>
      </div>
    </section>
  )
}