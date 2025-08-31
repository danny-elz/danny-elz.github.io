import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/providers/theme-provider'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
})

export const metadata: Metadata = {
  title: 'Danny Elzein - Systems That Scale Beyond Expectations',
  description: 'Danny Elzein: Fortune 500 cloud cost optimization expert. Reduced infrastructure costs by 67% while scaling systems for millions of users. Expert in Python, AWS, Next.js, Docker, and Kubernetes.',
  keywords: ['Danny Elzein', 'Cloud Architecture', 'Performance Optimization', 'AWS', 'Python', 'Next.js', 'System Design', 'Fortune 500'],
  authors: [{ name: 'Danny Elzein' }],
  creator: 'Danny Elzein',
  publisher: 'Danny Elzein',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://dannyelzein.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Danny Elzein - Systems That Scale Beyond Expectations',
    description: 'Fortune 500 cloud cost optimization expert. Reduced infrastructure costs by 67% while scaling systems for millions of users.',
    url: 'https://dannyelzein.com',
    siteName: 'Danny Elzein Portfolio',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Danny Elzein - Systems That Scale Beyond Expectations',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Danny Elzein - Systems That Scale Beyond Expectations',
    description: 'Fortune 500 cloud cost optimization expert. Reduced infrastructure costs by 67% while scaling systems.',
    images: ['/og-image.jpg'],
    creator: '@dannyelzein',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <meta name="theme-color" content="#000000" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://assets.calendly.com" />
        <link rel="preconnect" href="https://api.resend.com" />
        
        {/* Preload critical resources */}
        <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        
        {/* Analytics - Plausible */}
        {process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN && (
          <script
            defer
            data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN}
            src="https://plausible.io/js/script.js"
          />
        )}
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Danny Elzein',
              jobTitle: 'Cloud Architect & Performance Engineer',
              description: 'Fortune 500 cloud cost optimization expert specializing in scalable systems architecture.',
              url: 'https://dannyelzein.com',
              sameAs: [
                process.env.NEXT_PUBLIC_LINKEDIN_URL,
                'https://github.com/dannyelzein'
              ].filter(Boolean),
              knowsAbout: [
                'Cloud Architecture',
                'Performance Optimization', 
                'AWS',
                'Python',
                'Next.js',
                'System Design',
                'Kubernetes',
                'Docker'
              ],
              hasOccupation: {
                '@type': 'Occupation',
                name: 'Cloud Architect',
                occupationLocation: {
                  '@type': 'Place',
                  name: 'Remote'
                },
                description: 'Optimizing cloud infrastructure and system performance for Fortune 500 companies'
              }
            })
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`} style={{background: 'transparent'}}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          {/* Skip to main content for accessibility */}
          <a 
            href="#main-content" 
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-background text-foreground px-4 py-2 rounded-md border shadow-lg"
          >
            Skip to main content
          </a>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}