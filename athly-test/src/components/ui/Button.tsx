import type { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'gradient'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  loading?: boolean
  glow?: boolean
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth,
  loading,
  disabled,
  glow,
  className = '',
  ...props
}: ButtonProps) {
  const base = 'inline-flex items-center justify-center font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--color-background-dark)] disabled:opacity-50 disabled:cursor-not-allowed active:scale-95'
  
  const variants = {
    primary: 'bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-600)] focus:ring-[var(--color-primary-400)] rounded-xl shadow-lg hover:shadow-xl',
    secondary: 'bg-[var(--color-surface-card)] text-[var(--color-text-primary)] hover:bg-[var(--color-surface-dark)] border border-[var(--color-border-dark)] focus:ring-[var(--color-primary-400)] rounded-xl',
    outline: 'border-2 border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white focus:ring-[var(--color-primary-400)] rounded-xl',
    ghost: 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-card)] hover:text-[var(--color-text-primary)] focus:ring-[var(--color-primary-400)] rounded-lg',
    danger: 'bg-[var(--color-error)] text-white hover:bg-[var(--color-error-dark)] focus:ring-[var(--color-error)] rounded-xl shadow-lg hover:shadow-xl',
    gradient: 'text-white hover:opacity-90 focus:ring-[var(--color-primary-neon)] rounded-xl shadow-lg hover:shadow-[var(--shadow-glow)] gradient-primary',
  }
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  const glowClass = glow && !disabled ? 'glow-primary' : ''

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${glowClass} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : (
        children
      )}
    </button>
  )
}
