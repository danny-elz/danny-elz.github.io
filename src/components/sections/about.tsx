'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

interface AboutProps {
  className?: string
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
        rootMargin: '0px 0px -100px 0px'
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

export default function About({ className }: AboutProps) {
  const [containerRef, isVisible] = useIntersectionObserver(0.2)
  
  const principles = [
    {
      metric: '67%',
      label: 'Cost Reduction',
      description: 'Average infrastructure savings through strategic optimization'
    },
    {
      metric: '10×',
      label: 'Performance Gains', 
      description: 'Typical improvement in system throughput and reliability'
    },
    {
      metric: '99.9%',
      label: 'Success Rate',
      description: 'Projects delivered on time with measurable business impact'
    }
  ]

  return (
    <section 
      ref={containerRef}
      id="about"
      className={cn('py-12 md:py-16 content-section', className)}
      aria-labelledby="about-heading"
    >
      <div className="max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground mb-4">
            <div className="w-8 h-px bg-gradient-to-r from-transparent to-border" aria-hidden="true" />
            <span className="tracking-wider uppercase">Philosophy</span>
            <div className="w-8 h-px bg-gradient-to-l from-transparent to-border" aria-hidden="true" />
          </div>
          
          <h2 
            id="about-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6"
          >
            <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Systems That
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-green-500 to-blue-600 bg-clip-text text-transparent">
              Scale Impact
            </span>
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Every line of code serves a business purpose. Every architecture decision 
            drives measurable outcomes.
          </p>
        </div>

        {/* Core Philosophy */}
        <div className="space-y-12">
          {/* Principles Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {principles.map((principle, index) => (
              <div
                key={principle.label}
                className={cn(
                  'text-center space-y-4 transition-all duration-700 ease-out',
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                )}
                style={{
                  transitionDelay: `${index * 60}ms`
                }}
              >
                <div className="text-3xl md:text-4xl font-bold tabular-nums tracking-tight">
                  <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                    {principle.metric}
                  </span>
                </div>
                <div className="font-medium text-foreground">
                  {principle.label}
                </div>
                <div className="text-sm text-muted-foreground leading-relaxed">
                  {principle.description}
                </div>
              </div>
            ))}
          </div>

          {/* Core Message */}
          <div className="text-center space-y-8">
            <div 
              className={cn(
                'transition-all duration-700 ease-out',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              )}
              style={{ transitionDelay: '180ms' }}
            >
              <p className="text-xl md:text-2xl font-medium leading-relaxed text-foreground">
                I architect solutions that transform complexity into competitive advantage.
              </p>
            </div>
            
            <div 
              className={cn(
                'max-w-3xl mx-auto space-y-6 transition-all duration-700 ease-out',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              )}
              style={{ transitionDelay: '240ms' }}
            >
              <p className="text-lg text-muted-foreground leading-relaxed">
                From startups scaling to enterprise giants optimizing—I've guided technical decisions 
                that drive real business outcomes. <strong className="text-foreground">Neural Innovation</strong> represents 
                this philosophy: cutting-edge technology with practical impact.
              </p>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                Whether it's reducing cloud costs by 67%, scaling systems to handle 10× traffic, 
                or building tamper-proof compliance tools—every project starts with understanding 
                your business goals, not just technical requirements.
              </p>
            </div>

            {/* Call to Action */}
            <div 
              className={cn(
                'pt-6 transition-all duration-700 ease-out',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              )}
              style={{ transitionDelay: '300ms' }}
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 hover:scale-[1.02] transition-all duration-300"
                asChild
              >
                <a href="#contact" className="inline-flex items-center gap-2">
                  <span className="whitespace-nowrap">Start Your Project</span>
                  <svg 
                    className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </Button>
            </div>
          </div>

          {/* Visual Separator */}
        </div>
      </div>
    </section>
  )
}