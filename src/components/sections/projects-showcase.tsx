'use client'

import { useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import type { Project } from '@/types'

interface ProjectCardProps {
  project: Project
  index: number
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  
  const handleMouseEnter = () => {
    const video = videoRef.current
    if (!video) return
    
    video.currentTime = 0
    video.play().catch(() => {})
    setIsPlaying(true)
  }
  
  const handleMouseLeave = () => {
    const video = videoRef.current
    if (!video) return
    
    video.pause()
    setIsPlaying(false)
  }
  
  const handleFocus = () => handleMouseEnter()
  const handleBlur = () => handleMouseLeave()
  
  return (
    <article 
      className={cn(
        'group relative rounded-2xl border border-border/50 dark:border-border/30 overflow-hidden',
        'bg-card/50 dark:bg-card/20 backdrop-blur-sm transition-all duration-300',
        'hover:border-border dark:hover:border-border/50 hover:shadow-lg hover:shadow-primary/5 dark:hover:shadow-primary/10 hover:scale-[1.02]',
        'focus-within:border-ring focus-within:ring-1 focus-within:ring-ring focus-within:scale-[1.02]'
      )}
      style={{
        animationDelay: `${index * 60}ms`
      }}
    >
      {/* Project Preview */}
      <div 
        className="relative aspect-[4/3] bg-muted overflow-hidden"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
      >
        {project.links.demo ? (
          <>
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              muted
              playsInline
              preload="metadata"
              poster={`/images/projects/${project.id}-poster.jpg`}
              onLoadedData={() => setIsLoaded(true)}
            >
              <source src={`/videos/projects/${project.id}-preview.mp4`} type="video/mp4" />
            </video>
            
            {/* Play indicator */}
            <div className={cn(
              'absolute inset-0 flex items-center justify-center',
              'bg-black/20 transition-opacity duration-300',
              isPlaying ? 'opacity-0' : 'opacity-100'
            )}>
              <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
              </div>
            </div>
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 mx-auto rounded-full bg-muted-foreground/10 flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <p className="text-sm font-medium">Case Study Preview</p>
            </div>
          </div>
        )}
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" aria-hidden="true" />
      </div>
      
      {/* Project Content */}
      <div className="p-6 space-y-4">
        {/* Title and Context */}
        <div className="space-y-2">
          <h3 className="text-xl font-bold tracking-tight group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {project.challenge}
          </p>
        </div>
        
        {/* Key Metrics */}
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-sm">
            <span className="font-mono font-bold text-lg text-primary">
              {typeof project.metrics.primary === 'string' ? project.metrics.primary : project.metrics.primary.toLocaleString()}
            </span>
            {project.metrics.secondary && (
              <>
                <span className="text-muted-foreground">•</span>
                <span className="font-medium text-muted-foreground">
                  {project.metrics.secondary}
                </span>
              </>
            )}
          </div>
          
          {project.impact && (
            <p className="text-sm text-green-600 dark:text-green-400 font-medium">
              {project.impact}
            </p>
          )}
        </div>
        
        {/* Technologies */}
        <div className="flex flex-wrap gap-2">
          {project.technologies.slice(0, 6).map((tech) => (
            <span
              key={tech}
              className="text-xs px-2 py-1 rounded-full border border-border/50 dark:border-border/30 bg-muted/50 dark:bg-muted/20 text-muted-foreground hover:border-border dark:hover:border-border/50 hover:text-foreground transition-colors"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 6 && (
            <span className="text-xs px-2 py-1 rounded-full border border-dashed border-border/50 dark:border-border/30 text-muted-foreground">
              +{project.technologies.length - 6} more
            </span>
          )}
        </div>
        
        {/* Action Links */}
        <div className="flex items-center gap-3 pt-2">
          {project.links.architecture && (
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="text-sm font-medium p-0 h-auto hover:text-primary"
            >
              <a href={project.links.architecture}>
                View Architecture
              </a>
            </Button>
          )}
          {project.links.caseStudy && (
            <Button
              variant="outline"
              size="sm"
              asChild
              className="text-sm"
            >
              <a href={project.links.caseStudy}>
                Case Study →
              </a>
            </Button>
          )}
        </div>
      </div>
    </article>
  )
}

interface ProjectsShowcaseProps {
  className?: string
}

export default function ProjectsShowcase({ className }: ProjectsShowcaseProps) {
  const projects: Project[] = [
    {
      id: 'compliance-screenshot-archiver',
      title: 'Compliance Screenshot Archiver',
      description: 'Tamper-proof evidence system for legal compliance',
      challenge: 'Legal team needed tamper-proof evidence collection',
      solution: 'Built distributed screenshot archiving with cryptographic verification',
      impact: '$2.3M saved in compliance costs',
      metrics: {
        primary: '847,293',
        secondary: '0 tamper incidents in 2 years'
      },
      technologies: ['Python', 'AWS Lambda', 'S3 Object Lock', 'DynamoDB', 'EventBridge', 'Playwright', 'FastAPI'],
      links: {
        architecture: '#architecture',
        caseStudy: '#case-study',
        demo: '/videos/compliance-demo.mp4'
      },
      featured: true
    },
    {
      id: 'performance-transformation',
      title: 'Performance Transformation',
      description: 'E-commerce optimization for 1M+ daily users',
      challenge: 'E-commerce site serving 1M+ daily users with 2.7s load times',
      solution: 'Implemented edge-first architecture with advanced caching',
      impact: '+47% conversion rate increase',
      metrics: {
        primary: '2.7s → 0.4s',
        secondary: '+47% conversion'
      },
      technologies: ['Next.js', 'Edge Runtime', 'CDN', 'Image Pipeline', 'Redis', 'GraphQL'],
      links: {
        architecture: '#architecture',
        caseStudy: '#case-study'
      },
      featured: true
    },
    {
      id: 'ml-pipeline-optimization',
      title: 'ML Pipeline Optimization',
      description: 'Real-time fraud detection system enhancement',
      challenge: 'Real-time fraud detection with 92% accuracy needed improvement',
      solution: 'Redesigned ML pipeline with advanced feature engineering',
      impact: '10× throughput improvement',
      metrics: {
        primary: '92% → 99.3%',
        secondary: '10× throughput'
      },
      technologies: ['Python', 'TensorFlow', 'Redis', 'Kubernetes', 'Apache Kafka', 'PostgreSQL'],
      links: {
        architecture: '#architecture',
        caseStudy: '#case-study'
      },
      featured: true
    }
  ]
  
  return (
    <section 
      id="projects"
      className={cn('py-12 md:py-16 content-section', className)}
      aria-labelledby="projects-heading"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground mb-4">
            <div className="w-8 h-px bg-gradient-to-r from-transparent to-border" aria-hidden="true" />
            <span className="tracking-wider uppercase">Portfolio</span>
            <div className="w-8 h-px bg-gradient-to-l from-transparent to-border" aria-hidden="true" />
          </div>
          
          <h2 
            id="projects-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6"
          >
            <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Impact
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-green-500 to-blue-600 bg-clip-text text-transparent">
              Delivered
            </span>
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Real solutions solving complex problems. Each project represents measurable business impact and technical excellence.
          </p>
        </div>
        
        {/* Projects Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
            />
          ))}
        </div>
        
        {/* Call to Action */}
        <div className="text-center mt-10">
          <Button
            size="lg"
            variant="outline"
            className="text-base px-8 py-3 group"
          >
            <a href="#contact" className="flex items-center gap-2">
              Discuss Your Project
              <svg 
                className="w-4 h-4 transition-transform group-hover:translate-x-1" 
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
    </section>
  )
}