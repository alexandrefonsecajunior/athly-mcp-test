import type { HTMLAttributes } from 'react'

interface PageContainerProps extends HTMLAttributes<HTMLDivElement> {
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  padding?: boolean
  centered?: boolean
}

export function PageContainer({
  children,
  maxWidth = 'lg',
  padding = true,
  centered = false,
  className = '',
  ...props
}: PageContainerProps) {
  const maxWidths = {
    sm: 'max-w-2xl',
    md: 'max-w-4xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    full: 'max-w-full',
  }

  const paddingClass = padding ? 'px-4 py-6 md:px-6 md:py-8' : ''
  const centerClass = centered ? 'mx-auto' : ''

  return (
    <div
      className={`w-full ${maxWidths[maxWidth]} ${paddingClass} ${centerClass} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
