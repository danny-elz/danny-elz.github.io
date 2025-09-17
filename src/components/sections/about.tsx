'use client'

import { cn } from '@/lib/utils'
import { useSectionTracking } from '@/hooks/useAnalytics'
import Image from 'next/image'
import {
  Code,
  Briefcase,
  Heart,
  Gamepad2,
  Dumbbell,
  Brain,
  Mountain,
  Coffee,
  User,
  Target,
  Sparkles,
  Lightbulb
} from 'lucide-react'

interface AboutProps {
  className?: string
}

export default function About({ className }: AboutProps) {
  const sectionRef = useSectionTracking('about')

  const interests = [
    { icon: Gamepad2, label: 'Gaming', description: 'Competitive FPS & strategy games' },
    { icon: Dumbbell, label: 'Fitness', description: 'Weightlifting & running' },
    { icon: Mountain, label: 'Adventure', description: 'Hiking & exploring nature' },
    { icon: Brain, label: 'Learning', description: 'AI/ML & new technologies' },
    { icon: Coffee, label: 'Coffee', description: 'Craft coffee enthusiast' },
    { icon: Code, label: 'Open Source', description: 'Contributing to OSS projects' },
  ]

  return (
    <section
      ref={sectionRef}
      id="about"
      className={cn(
        'py-16 md:py-24 content-section relative overflow-hidden',
        className
      )}
      aria-labelledby="about-heading"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Heart className="w-4 h-4" />
            <span>About Me</span>
          </div>
          <h2
            id="about-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6"
          >
            <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Beyond The Code
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Full-stack developer by profession, problem solver by passion
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Left Column - Professional Role */}
          <div className="lg:col-span-1 space-y-6">
            <div className="relative">
              <div className="relative w-48 h-48 mx-auto lg:mx-0 rounded-2xl overflow-hidden border-4 border-primary/20">
                <Image
                  src="/profile-photo.png"
                  alt="Danny Elzein"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Briefcase className="w-5 h-5 text-primary" />
                <div>
                  <h3 className="font-semibold">Full-Stack Developer</h3>
                  <p className="text-sm text-muted-foreground">Systems Architect</p>
                </div>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                I specialize in building scalable systems that don't just meet requirements—they exceed expectations.
                With expertise in systems architecture, modern web technologies, and a passion for clean code,
                I transform complex problems into elegant solutions.
              </p>

              <div className="pt-4 space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                  <span className="text-muted-foreground">Available for projects</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <span className="text-muted-foreground">Remote worldwide</span>
                </div>
              </div>
            </div>
          </div>

          {/* Middle Column - Personal Story */}
          <div className="lg:col-span-1 space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                Who I Am
              </h3>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Hi! I'm Danny—a developer who believes that great software is born from the intersection
                  of technical excellence and human creativity.
                </p>
                <p>
                  My journey into tech started with a simple curiosity about how things work.
                  That curiosity evolved into a passion for building systems that make a real difference
                  in people's lives and businesses' success.
                </p>
                <p>
                  When I'm not designing systems,
                  you'll find me pushing my limits at the gym, exploring new hiking trails,
                  or diving deep into the latest advancements in AI and machine learning.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                My Philosophy
              </h3>
              <div className="space-y-3">
                <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
                  <p className="text-sm italic text-muted-foreground">
                    "Excellence is not about perfection—it's about continuous improvement
                    and delivering value that matters."
                  </p>
                </div>
                <p className="text-muted-foreground text-sm">
                  I approach every project with the mindset of a craftsman: attention to detail,
                  pride in the work, and always keeping the end user in mind.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Interests & Hobbies */}
          <div className="lg:col-span-1 space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                Interests & Hobbies
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {interests.map((interest) => {
                  const Icon = interest.icon
                  return (
                    <div
                      key={interest.label}
                      className="group p-3 rounded-lg bg-muted/30 border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-sm"
                    >
                      <div className="flex items-start gap-3">
                        <Icon className="w-5 h-5 text-primary mt-0.5 group-hover:scale-110 transition-transform" />
                        <div>
                          <p className="font-medium text-sm">{interest.label}</p>
                          <p className="text-xs text-muted-foreground">{interest.description}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-primary" />
                Fun Facts
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>Can debug code faster after a good workout session</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>Believe the best solutions come during hiking breaks</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>Coffee consumption directly correlates with code quality</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>Gaming strategy skills translate surprisingly well to system architecture</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 rounded-2xl bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20">
            <p className="text-lg font-medium">
              Let's build something extraordinary together
            </p>
            <a
              href="#contact"
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Start a Conversation
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}