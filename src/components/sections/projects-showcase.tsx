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
  
  // Determine image extension based on project
  const getImageExtension = (projectId: string) => {
    const pngProjects = ['compliance-screenshot-archiver', 'automotive-buyers-toolkit', 'd-sports']
    return pngProjects.includes(projectId) ? 'png' : 'jpg'
  }
  
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
              poster={`/images/projects/${project.id}.${getImageExtension(project.id)}`}
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
          <img
            src={`/images/projects/${project.id}.${getImageExtension(project.id)}`}
            alt={`${project.title} screenshot`}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
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
              {project.metrics.primary}
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
                View Demo →
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
      description: 'Enterprise evidence archival with tamper-proof verification',
      challenge: 'Legal compliance required tamper-proof screenshot archival system',
      solution: 'Built SHA-256 encrypted archival with 100% uptime guarantee',
      impact: 'Zero tamper incidents achieved',
      metrics: {
        primary: '100%',
        secondary: 'Uptime guarantee'
      },
      technologies: ['Python', 'Encryption', 'SHA-256', 'Cloud Storage', 'Compliance', 'Legal Tech'],
      links: {
        architecture: 'https://github.com/danny-elz/compliance-screenshot-archiver',
        caseStudy: 'https://github.com/danny-elz/compliance-screenshot-archiver'
      },
      featured: true
    },
    {
      id: 'automotive-buyers-toolkit',
      title: 'Automotive Buyers Toolkit',
      description: 'AI-powered automotive purchasing decision platform',
      challenge: 'Car buyers needed comprehensive analysis tools for informed decisions',
      solution: 'Built AI-driven platform with market analysis and decision support',
      impact: 'Beta launching Q1 2026',
      metrics: {
        primary: 'Q1 2026',
        secondary: 'Beta Launch'
      },
      technologies: ['AI/ML', 'Market Analysis', 'Decision Support', 'Automotive Data', 'Next.js', 'TypeScript'],
      links: {
        architecture: 'https://prod.shaikhcloud.com/',
        caseStudy: 'https://prod.shaikhcloud.com/'
      },
      featured: true
    },
    {
      id: 'd-sports',
      title: 'D-Sports Platform',
      description: 'Decentralized sports NFT and blockchain ecosystem',
      challenge: 'Sports industry needed blockchain-based asset management platform',
      solution: 'Built comprehensive decentralized sports platform with NFT integration',
      impact: 'Revolutionary sports blockchain',
      metrics: {
        primary: 'Blockchain',
        secondary: 'Sports NFTs'
      },
      technologies: ['Blockchain', 'NFTs', 'Decentralized Systems', 'Sports Analytics', 'Web3', 'Smart Contracts'],
      links: {
        architecture: 'https://app.d-sports.org/',
        caseStudy: 'https://app.d-sports.org/'
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