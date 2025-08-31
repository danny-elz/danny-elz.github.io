'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import type { Experience } from '@/types'

interface TimelineItemProps {
  experience: Experience
  index: number
  isVisible: boolean
}

function TimelineItem({ experience, index, isVisible }: TimelineItemProps) {
  return (
    <li 
      className={cn(
        'relative transition-all duration-700 ease-out',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      )}
      style={{
        transitionDelay: `${index * 60}ms`
      }}
    >
      {/* Timeline dot */}
      <div className="absolute -left-6 top-6 w-4 h-4 rounded-full border-2 border-primary dark:border-primary/80 bg-background dark:bg-background/90 transition-all duration-300 hover:scale-110 focus:scale-110 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2" tabIndex={0} />
      
      {/* Content */}
      <div className="space-y-1">
        <div className="text-sm font-medium text-muted-foreground tabular-nums">
          {experience.duration}
        </div>
        <h3 className="font-bold text-lg leading-tight hover:text-primary transition-colors focus:text-primary focus:outline-none" tabIndex={0}>
          {experience.company}
        </h3>
        <div className="text-sm text-muted-foreground font-medium">
          {experience.role}
        </div>
        {experience.highlights.length > 0 && (
          <div className="text-sm text-muted-foreground pt-1">
            {experience.highlights[0]}
          </div>
        )}
        
        {/* Technologies */}
        {experience.technologies.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {experience.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="text-xs px-2 py-1 rounded-full border border-border/50 dark:border-border/30 bg-muted/30 dark:bg-muted/20 text-muted-foreground"
              >
                {tech}
              </span>
            ))}
            {experience.technologies.length > 4 && (
              <span className="text-xs px-2 py-1 text-muted-foreground">
                +{experience.technologies.length - 4} more
              </span>
            )}
          </div>
        )}
      </div>
    </li>
  )
}

interface ExperienceTimelineProps {
  className?: string
}

export default function ExperienceTimeline({ className }: ExperienceTimelineProps) {
  const [isVisible, setIsVisible] = useState(false)
  const timelineRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
      }
    )
    
    const element = timelineRef.current
    if (element) {
      observer.observe(element)
    }
    
    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [])
  
  const experiences: Experience[] = [
    {
      id: 'neural-innovation',
      company: 'Neural Innovation',
      role: 'Founder & Lead Engineer',
      duration: '2025 – Present',
      startDate: new Date('2025-01-01'),
      highlights: [
        'Building next-generation compliance tools',
        'Scaling cloud infrastructure for Fortune 500 clients',
        'Leading technical strategy and product development'
      ],
      technologies: ['Python', 'AWS', 'Next.js', 'TypeScript', 'PostgreSQL']
    },
    {
      id: 'techcorp-senior',
      company: 'Senior Architect @ TechCorp',
      role: 'Technical Lead',
      duration: '2024 – 2025',
      startDate: new Date('2024-01-01'),
      endDate: new Date('2025-01-01'),
      highlights: [
        'Led 12-person engineering team',
        'Reduced infrastructure costs by 67%',
        'Architected microservices for 10M+ users'
      ],
      technologies: ['Kubernetes', 'Docker', 'AWS', 'Python', 'React', 'GraphQL']
    },
    {
      id: 'startupxyz',
      company: 'Software Engineer @ StartupXYZ',
      role: 'Full Stack Engineer',
      duration: '2022 – 2024',
      startDate: new Date('2022-01-01'),
      endDate: new Date('2024-01-01'),
      highlights: [
        'Scaled platform from 0 to 1M+ users',
        'Built real-time collaboration features',
        'Optimized database performance by 10x'
      ],
      technologies: ['Node.js', 'React', 'PostgreSQL', 'Redis', 'AWS Lambda']
    },
    {
      id: 'freelance',
      company: 'Freelance Developer',
      role: 'Full Stack Consultant',
      duration: '2020 – 2022',
      startDate: new Date('2020-01-01'),
      endDate: new Date('2022-01-01'),
      highlights: [
        'Delivered 20+ projects for various clients',
        'Specialized in performance optimization',
        'Built custom CMS and e-commerce solutions'
      ],
      technologies: ['React', 'Node.js', 'Python', 'Django', 'PostgreSQL']
    }
  ]
  
  return (
    <section 
      className={cn('py-12 md:py-16 content-section', className)}
      aria-labelledby="experience-heading"
    >
      <div className="max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground mb-4">
            <div className="w-8 h-px bg-gradient-to-r from-transparent to-border" aria-hidden="true" />
            <span className="tracking-wider uppercase">Journey</span>
            <div className="w-8 h-px bg-gradient-to-l from-transparent to-border" aria-hidden="true" />
          </div>
          
          <h2 
            id="experience-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6"
          >
            <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Professional
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-green-500 to-blue-600 bg-clip-text text-transparent">
              Evolution
            </span>
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A growth story spanning startups to enterprise, 
            consistently delivering scalable solutions and measurable business impact.
          </p>
        </div>
        
        {/* Timeline */}
        <div 
          ref={timelineRef}
          className="relative"
        >
          {/* Timeline line */}
          <div 
            className={cn(
              'absolute left-2 top-0 bottom-0 w-px bg-gradient-to-b transition-all duration-1000',
              isVisible 
                ? 'from-primary via-primary/50 to-transparent scale-y-100' 
                : 'from-border via-border to-transparent scale-y-0',
              'origin-top'
            )}
            aria-hidden="true"
          />
          
          {/* Timeline items */}
          <ul className="space-y-8 pl-8">
            {experiences.map((experience, index) => (
              <TimelineItem
                key={experience.id}
                experience={experience}
                index={index}
                isVisible={isVisible}
              />
            ))}
          </ul>
        </div>
        
        {/* Call to Action */}
        <div className="text-center mt-10">
          <div className="inline-flex items-center gap-3 text-sm text-muted-foreground">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-border" aria-hidden="true" />
            <span>Ready to add your project to this timeline?</span>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-border" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  )
}