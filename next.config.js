/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // No appDir needed for Next.js 14+ with App Router
  },
  output: 'export',
  trailingSlash: true,
  basePath: '',
  assetPrefix: '',
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
}

module.exports = nextConfig