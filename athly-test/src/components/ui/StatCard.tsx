import { Card } from './Card'
import { Badge } from './Badge'

interface StatCardProps {
  label: string
  value: string | number
  icon?: React.ReactNode
  badge?: {
    text: string
    variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'neon'
  }
  trend?: {
    value: number
    label?: string
  }
  variant?: 'default' | 'gradient' | 'glow'
  gradient?: boolean
}

export function StatCard({
  label,
  value,
  icon,
  badge,
  trend,
  variant = 'default',
  gradient = false,
}: StatCardProps) {
  const getTrendColor = (trendValue: number) => {
    if (trendValue > 0) return 'text-[var(--color-success)]'
    if (trendValue < 0) return 'text-[var(--color-error)]'
    return 'text-[var(--color-text-tertiary)]'
  }

  const getTrendIcon = (trendValue: number) => {
    if (trendValue > 0) return '↗'
    if (trendValue < 0) return '↘'
    return '→'
  }

  return (
    <Card variant={variant} padding="lg" className="relative overflow-hidden">
      {badge && (
        <div className="absolute top-4 right-4">
          <Badge variant={badge.variant || 'primary'} size="sm">
            {badge.text}
          </Badge>
        </div>
      )}

      <div className="flex items-start gap-4">
        {icon && (
          <div className="flex-shrink-0 text-[var(--color-primary-400)] text-3xl">
            {icon}
          </div>
        )}

        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-[var(--color-text-tertiary)] uppercase tracking-wide">
            {label}
          </p>
          
          <p className={`mt-2 text-3xl font-bold ${gradient ? 'text-gradient' : 'text-[var(--color-text-primary)]'}`}>
            {value}
          </p>

          {trend && (
            <div className={`mt-2 flex items-center gap-1 text-sm font-semibold ${getTrendColor(trend.value)}`}>
              <span className="text-lg">{getTrendIcon(trend.value)}</span>
              <span>{Math.abs(trend.value)}%</span>
              {trend.label && (
                <span className="text-[var(--color-text-tertiary)] font-normal">
                  {trend.label}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}
