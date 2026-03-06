import type { HTMLAttributes } from 'react'

interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  value: number
  max?: number
  variant?: 'primary' | 'gradient' | 'success' | 'warning' | 'error'
  size?: 'sm' | 'md' | 'lg'
  showValue?: boolean
  glow?: boolean
}

export function ProgressBar({
  value,
  max = 100,
  variant = 'primary',
  size = 'md',
  showValue = false,
  glow = false,
  className = '',
  ...props
}: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100)

  const sizes = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  }

  const variants = {
    primary: 'bg-[var(--color-primary-500)]',
    gradient: 'gradient-primary',
    success: 'bg-[var(--color-success)]',
    warning: 'bg-[var(--color-warning)]',
    error: 'bg-[var(--color-error)]',
  }

  const glowClass = glow ? 'shadow-[var(--shadow-neon)]' : ''

  return (
    <div className={`relative w-full ${className}`} {...props}>
      {showValue && (
        <div className="mb-2 flex items-center justify-between text-sm font-semibold">
          <span className="text-[var(--color-text-secondary)]">Progresso</span>
          <span className="text-[var(--color-text-primary)]">{Math.round(percentage)}%</span>
        </div>
      )}
      <div className={`w-full overflow-hidden rounded-full bg-[var(--color-surface-dark)] ${sizes[size]}`}>
        <div
          className={`h-full transition-all duration-500 ease-out ${variants[variant]} ${glowClass}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
