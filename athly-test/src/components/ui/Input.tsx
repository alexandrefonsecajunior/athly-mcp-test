import type { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: React.ReactNode
}

export function Input({ label, error, icon, className = '', id, ...props }: InputProps) {
  const inputId = id || crypto.randomUUID()

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="mb-2 block text-sm font-semibold text-[var(--color-text-secondary)]"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-[var(--color-text-tertiary)]">
            {icon}
          </div>
        )}
        <input
          id={inputId}
          className={`w-full rounded-xl border bg-[var(--color-surface-dark)] px-4 py-3 text-[var(--color-text-primary)] placeholder-[var(--color-text-tertiary)] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--color-background-dark)] ${
            icon ? 'pl-12' : ''
          } ${
            error 
              ? 'border-[var(--color-error)] focus:border-[var(--color-error)] focus:ring-[var(--color-error)]' 
              : 'border-[var(--color-border-dark)] focus:border-[var(--color-primary)] focus:ring-[var(--color-primary-400)] hover:border-[var(--color-border-accent)]'
          } ${className}`}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-2 text-sm text-[var(--color-error-light)] flex items-center gap-1">
          <span>⚠</span>
          {error}
        </p>
      )}
    </div>
  )
}
