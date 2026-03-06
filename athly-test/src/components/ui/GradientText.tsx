import type { HTMLAttributes } from 'react'

interface GradientTextProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'neon' | 'reverse'
  animated?: boolean
}

export function GradientText({
  children,
  variant = 'primary',
  animated = false,
  className = '',
  ...props
}: GradientTextProps) {
  const variants = {
    primary: 'bg-gradient-to-r from-[var(--color-primary-400)] to-[var(--color-secondary-500)]',
    neon: 'bg-gradient-to-r from-[var(--color-primary-neon)] to-[var(--color-secondary-neon)]',
    reverse: 'bg-gradient-to-r from-[var(--color-secondary-500)] to-[var(--color-primary-400)]',
  }

  const animationClass = animated ? 'animate-gradient' : ''

  return (
    <span
      className={`inline-block bg-clip-text text-transparent font-bold ${variants[variant]} ${animationClass} ${className}`}
      style={{
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}
      {...props}
    >
      {children}
    </span>
  )
}
