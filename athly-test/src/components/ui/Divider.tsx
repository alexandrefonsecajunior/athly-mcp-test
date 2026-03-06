import type { HTMLAttributes } from 'react'

interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'solid' | 'gradient' | 'dashed'
  spacing?: 'sm' | 'md' | 'lg'
  label?: string
}

export function Divider({
  variant = 'solid',
  spacing = 'md',
  label,
  className = '',
  ...props
}: DividerProps) {
  const spacings = {
    sm: 'my-4',
    md: 'my-6',
    lg: 'my-8',
  }

  const variants = {
    solid: 'border-t border-[var(--color-border-dark)]',
    gradient: 'h-px bg-gradient-to-r from-transparent via-[var(--color-primary-500)] to-transparent',
    dashed: 'border-t border-dashed border-[var(--color-border-dark)]',
  }

  if (label) {
    return (
      <div className={`relative flex items-center ${spacings[spacing]} ${className}`} {...props}>
        <div className={`flex-1 ${variants[variant]}`} />
        <span className="px-4 text-sm font-medium text-[var(--color-text-tertiary)]">
          {label}
        </span>
        <div className={`flex-1 ${variants[variant]}`} />
      </div>
    )
  }

  return (
    <div
      className={`${variants[variant]} ${spacings[spacing]} ${className}`}
      {...props}
    />
  )
}
