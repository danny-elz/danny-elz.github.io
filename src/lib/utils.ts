import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat().format(num)
}

export function getTimeBasedGreeting(): string {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 18) return 'Good afternoon'
  return 'Good evening'
}

export function animateCounter(element: HTMLElement, target: number, duration = 2000) {
  const start = 0
  const startTime = Date.now()
  
  const updateCounter = () => {
    const elapsed = Date.now() - startTime
    const progress = Math.min(elapsed / duration, 1)
    
    // Easing function
    const easeOutQuart = 1 - Math.pow(1 - progress, 4)
    const current = Math.floor(start + (target - start) * easeOutQuart)
    
    element.textContent = formatNumber(current)
    
    if (progress < 1) {
      requestAnimationFrame(updateCounter)
    }
  }
  
  requestAnimationFrame(updateCounter)
}