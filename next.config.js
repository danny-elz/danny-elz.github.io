/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // No appDir needed for Next.js 14+ with App Router
  },
  // Optimize webpack configuration for performance
  webpack: (config) => {
    // Exclude Archon and context pack folders from build
    config.module.rules.push({
      test: /\.(js|jsx|ts|tsx)$/,
      exclude: [
        /node_modules/,
        /Archon/,
        /enhanced-portfolio-context-pack/
      ]
    })
    
    config.resolve.alias = {
      ...config.resolve.alias,
    }
    
    // Optimize chunking for better caching
    config.optimization = {
      ...config.optimization,
      splitChunks: {
        ...config.optimization.splitChunks,
        cacheGroups: {
          ...config.optimization.splitChunks.cacheGroups,
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            priority: 20,
          },
          vanta: {
            test: /[\\/]node_modules[\\/]vanta[\\/]/,
            name: 'vanta',
            chunks: 'all',
            priority: 30,
          },
          framerMotion: {
            test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
            name: 'framer-motion',
            chunks: 'all',
            priority: 30,
          }
        }
      }
    }
    
    return config
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: ['github.com', 'githubusercontent.com'],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  poweredByHeader: false,
  compress: true,
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        {
          key: 'X-Frame-Options',
          value: 'DENY',
        },
        {
          key: 'X-XSS-Protection',
          value: '1; mode=block',
        },
        {
          key: 'Referrer-Policy',
          value: 'strict-origin-when-cross-origin',
        },
        {
          key: 'Content-Security-Policy',
          value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://assets.calendly.com https://plausible.io; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://api.resend.com https://plausible.io; frame-src https://calendly.com;",
        },
      ],
    },
  ],
}

module.exports = nextConfig