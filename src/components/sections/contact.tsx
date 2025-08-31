'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useSectionTracking } from '@/hooks/useAnalytics'
import { trackConversion } from '@/lib/analytics'

interface ContactProps {
  className?: string
}

export default function Contact({ className }: ContactProps) {
  const sectionRef = useSectionTracking('contact')
  const [activeTab, setActiveTab] = useState<'email' | 'calendly' | 'linkedin'>('email')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus('sending')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const result = await response.json()

      if (result.success) {
        setStatus('sent')
        setFormData({ name: '', email: '', message: '' })
        trackConversion('email_sent', 'contact_form')
      } else {
        throw new Error(result.message)
      }
    } catch (error) {
      setStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section 
      ref={sectionRef}
      id="contact"
      className={cn('py-12 md:py-16 content-section', className)}
    >
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Let's Build
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-green-500 to-blue-600 bg-clip-text text-transparent">
              Something Great
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ready to optimize your systems and reduce costs? Choose your preferred way to get in touch.
          </p>
        </div>

        <div className="space-y-6">
          {/* Tabs */}
          <div className="flex justify-center">
            <div className="inline-flex items-center p-1 rounded-lg bg-muted/50 dark:bg-muted/20 border border-border dark:border-border/50">
              {[
                { id: 'email' as const, label: 'Email', icon: '✉️' },
                { id: 'calendly' as const, label: 'Book Call', icon: '📅' },
                { id: 'linkedin' as const, label: 'LinkedIn', icon: '💼' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id)
                    trackConversion('contact_tab_switch', tab.id)
                  }}
                  className={cn(
                    'px-4 py-2 text-sm font-medium rounded-md transition-all duration-300 hover:scale-[1.02]',
                    activeTab === tab.id
                      ? 'bg-background dark:bg-background/80 text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                  aria-pressed={activeTab === tab.id}
                  role="tab"
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div>
            {activeTab === 'email' && (
              <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Name *
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-3 border border-border dark:border-border/50 rounded-lg bg-background dark:bg-background/50 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-primary dark:focus:border-primary/50 transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email *
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-4 py-3 border border-border dark:border-border/50 rounded-lg bg-background dark:bg-background/50 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-primary dark:focus:border-primary/50 transition-colors"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    rows={6}
                    className="w-full px-4 py-3 border border-border dark:border-border/50 rounded-lg bg-background dark:bg-background/50 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-primary dark:focus:border-primary/50 transition-colors resize-none"
                    placeholder="Tell me about your project..."
                    required
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full md:w-auto hover:scale-[1.02] transition-all duration-300"
                  aria-describedby="submit-status"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
                {status === 'sent' && (
                  <p className="text-green-600 text-sm">✅ Message sent successfully!</p>
                )}
                {status === 'error' && (
                  <p className="text-red-600 text-sm">❌ Error sending message. Please try again.</p>
                )}
              </form>
            )}

            {activeTab === 'calendly' && (
              <div className="text-center space-y-6">
                <h3 className="text-lg font-semibold">Schedule a Strategy Call</h3>
                <div className="border rounded-lg overflow-hidden">
                  <iframe
                    src={`${process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/dannyelzein'}?embed_domain=${typeof window !== 'undefined' ? window.location.hostname : ''}`}
                    width="100%"
                    height="600"
                    frameBorder="0"
                    title="Schedule a meeting"
                  />
                </div>
              </div>
            )}

            {activeTab === 'linkedin' && (
              <div className="text-center space-y-6">
                <h3 className="text-lg font-semibold">Connect on LinkedIn</h3>
                <div className="p-8 border border-border dark:border-border/50 rounded-lg bg-background/50 dark:bg-background/20">
                  <div className="w-16 h-16 mx-auto mb-4 bg-blue-600 dark:bg-blue-700 rounded-full flex items-center justify-center">
                    <span className="text-2xl text-white">💼</span>
                  </div>
                  <Button asChild>
                    <a 
                      href={process.env.NEXT_PUBLIC_LINKEDIN_URL || 'https://linkedin.com/in/dannyelzein'}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackConversion('linkedin_click', 'contact_tab')}
                    >
                      Connect on LinkedIn
                    </a>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}