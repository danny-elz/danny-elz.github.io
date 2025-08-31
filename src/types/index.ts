export interface Project {
  id: string
  title: string
  description: string
  challenge: string
  solution: string
  impact: string
  metrics: {
    primary: string
    secondary?: string
  }
  technologies: string[]
  links: {
    architecture?: string
    caseStudy?: string
    demo?: string
  }
  featured: boolean
}

export interface Experience {
  id: string
  company: string
  role: string
  duration: string
  startDate: Date
  endDate?: Date
  highlights: string[]
  technologies: string[]
}

export interface MetricStat {
  label: string
  value: number | string
  suffix?: string
  animated?: boolean
}

export interface ContactFormData {
  name: string
  email: string
  company?: string
  message: string
  budget?: string
  timeline?: string
}

export interface AvailabilitySlot {
  month: string
  availableSlots: number
  totalSlots: number
}

export type ContactMethod = 'email' | 'calendly' | 'linkedin'