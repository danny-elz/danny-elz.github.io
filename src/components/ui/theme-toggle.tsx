'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="sm"
        className={cn(
          'h-9 w-9 px-0',
          'bg-background/50 backdrop-blur-sm border border-border/50',
          'hover:bg-background/80 hover:border-border',
          'transition-all duration-300',
          className
        )}
      >
        <div className="h-4 w-4" />
      </Button>
    )
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => {
        setTheme(theme === 'light' ? 'dark' : 'light')
      }}
      className={cn(
        'h-9 w-9 px-0 relative',
        'bg-background/50 backdrop-blur-sm border border-border/50',
        'hover:bg-background/80 hover:border-border hover:scale-[1.02]',
        'transition-all duration-300',
        className
      )}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
    >
      {/* Sun icon (light mode) */}
      <svg
        className={cn(
          'absolute h-4 w-4 transition-all duration-300',
          theme === 'light' || theme === 'system'
            ? 'rotate-0 scale-100 opacity-100' 
            : 'rotate-90 scale-0 opacity-0'
        )}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="5" />
        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
      </svg>
      
      {/* Moon icon (dark mode) */}
      <svg
        className={cn(
          'absolute h-4 w-4 transition-all duration-300',
          theme === 'dark' 
            ? 'rotate-0 scale-100 opacity-100' 
            : 'rotate-90 scale-0 opacity-0'
        )}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    </Button>
  )
}