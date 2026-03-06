import type { HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: 'none' | 'sm' | 'md' | 'lg'
  variant?: 'default' | 'gradient' | 'glow' | 'flat'
}

export function Card({ 
  children, 
  padding = 'md', 
  variant = 'default',
  className = '', 
  ...props 
}: CardProps) {
  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  }

  const variants = {
    default: 'bg-[var(--color-surface-card)] border border-[var(--color-border-dark)] shadow-lg backdrop-blur-sm',
    gradient: 'gradient-card border border-[var(--color-border-dark)] shadow-xl',
    glow: 'bg-[var(--color-surface-card)] border border-[var(--color-primary-500)] shadow-[var(--shadow-neon)]',
    flat: 'bg-[var(--color-surface-card)] border-none',
  }

  return (
    <div
      className={`rounded-2xl transition-all duration-300 hover:scale-[1.01] ${variants[variant]} ${paddings[padding]} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
