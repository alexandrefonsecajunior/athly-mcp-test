import type { HTMLAttributes } from 'react'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'neon'
  size?: 'sm' | 'md' | 'lg'
}

export function Badge({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}: BadgeProps) {
  const variants = {
    primary: 'bg-[var(--color-primary-500)]/20 text-[var(--color-primary-neon)] border-[var(--color-primary-500)]',
    secondary: 'bg-[var(--color-secondary-500)]/20 text-[var(--color-secondary-neon)] border-[var(--color-secondary-500)]',
    success: 'bg-[var(--color-success)]/20 text-[var(--color-success-light)] border-[var(--color-success)]',
    warning: 'bg-[var(--color-warning)]/20 text-[var(--color-warning-light)] border-[var(--color-warning)]',
    error: 'bg-[var(--color-error)]/20 text-[var(--color-error-light)] border-[var(--color-error)]',
    neon: 'gradient-neon text-white border-none shadow-[var(--shadow-glow)]',
  }

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base',
  }

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border font-semibold transition-all ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </span>
  )
}
