import type { HTMLAttributes } from 'react'

interface SectionProps extends HTMLAttributes<HTMLElement> {
  title?: string
  subtitle?: string
  action?: React.ReactNode
  spacing?: 'sm' | 'md' | 'lg'
}

export function Section({
  children,
  title,
  subtitle,
  action,
  spacing = 'md',
  className = '',
  ...props
}: SectionProps) {
  const spacings = {
    sm: 'space-y-3',
    md: 'space-y-6',
    lg: 'space-y-8',
  }

  return (
    <section className={`${spacings[spacing]} ${className}`} {...props}>
      {(title || subtitle || action) && (
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            {title && (
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-text-primary)]">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-2 text-[var(--color-text-secondary)]">{subtitle}</p>
            )}
          </div>
          {action && <div className="flex-shrink-0">{action}</div>}
        </div>
      )}
      {children}
    </section>
  )
}
