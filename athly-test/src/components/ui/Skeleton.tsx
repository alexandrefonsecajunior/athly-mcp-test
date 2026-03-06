interface SkeletonProps {
  className?: string
  variant?: 'default' | 'shimmer'
}

export function Skeleton({ className = '', variant = 'shimmer' }: SkeletonProps) {
  const baseClass = 'rounded-xl bg-[var(--color-surface-darker)]'
  const variantClass = variant === 'shimmer' 
    ? 'animate-pulse bg-gradient-to-r from-[var(--color-surface-darker)] via-[var(--color-surface-dark)] to-[var(--color-surface-darker)] bg-[length:200%_100%]'
    : 'animate-pulse'

  return (
    <div className={`${baseClass} ${variantClass} ${className}`} />
  )
}

export function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-[var(--color-border-dark)] bg-[var(--color-surface-card)] p-6 shadow-lg">
      <Skeleton className="mb-4 h-6 w-2/3" />
      <Skeleton className="mb-3 h-4 w-full" />
      <Skeleton className="mb-3 h-4 w-4/5" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  )
}

export function SkeletonWorkout() {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-[var(--color-border-dark)] bg-[var(--color-surface-card)] p-6 shadow-lg">
        <Skeleton className="mb-4 h-8 w-1/2" />
        <Skeleton className="mb-3 h-4 w-full" />
        <Skeleton className="mb-6 h-4 w-3/4" />
        <Skeleton className="h-12 w-full rounded-xl" />
      </div>
      <div className="rounded-2xl border border-[var(--color-border-dark)] bg-[var(--color-surface-card)] p-6 shadow-lg">
        <Skeleton className="mb-4 h-6 w-1/3" />
        <Skeleton className="mb-3 h-20 w-full rounded-xl" />
        <Skeleton className="h-20 w-full rounded-xl" />
      </div>
    </div>
  )
}
