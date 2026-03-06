import { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import type { ScheduledWorkout } from '@/types'

interface WorkoutCardProps {
  workout: ScheduledWorkout
  compact?: boolean
  showBlocks?: boolean
}

const workoutTypeColors: Record<string, { variant: 'success' | 'error' | 'warning' | 'primary' | 'neon'; label: string }> = {
  Recovery: { variant: 'success', label: 'Recovery' },
  Intervals: { variant: 'error', label: 'Intervals' },
  Tempo: { variant: 'warning', label: 'Tempo' },
  Easy: { variant: 'primary', label: 'Easy' },
  'Long Run': { variant: 'neon', label: 'Long Run' },
}

const blockTypeIcons: Record<string, string> = {
  warmup: '🔥',
  workout: '💪',
  cooldown: '❄️',
}

export function WorkoutCard({ workout, compact, showBlocks: initialShowBlocks }: WorkoutCardProps) {
  const [showBlocks, setShowBlocks] = useState(initialShowBlocks ?? false)

  const date = new Date(workout.scheduled_date + 'T12:00:00').toLocaleDateString('pt-BR', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  })

  const typeConfig = workoutTypeColors[workout.workout_type] ?? { variant: 'primary' as const, label: workout.workout_type }
  const mainBlock = workout.blocks.find(b => b.type === 'workout')

  return (
    <Card className="group transition-all duration-300">
      <div
        className="flex items-start justify-between gap-3 cursor-pointer"
        onClick={() => setShowBlocks(!showBlocks)}
      >
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant={typeConfig.variant} size="sm">
              {typeConfig.label}
            </Badge>
            <Badge variant="secondary" size="sm">
              {workout.intensity}
            </Badge>
          </div>
          <h3 className="mt-3 font-bold text-[var(--color-text-primary)] text-lg">
            {workout.title}
          </h3>
          {!compact && (
            <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-[var(--color-text-tertiary)]">
              <span className="flex items-center gap-1">
                📅 {workout.day_of_week} - {date}
              </span>
              <span className="flex items-center gap-1">
                📏 {workout.total_distance_km} km
              </span>
              <span className="flex items-center gap-1">
                ⏱ {workout.total_duration_minutes} min
              </span>
              {mainBlock?.target_pace && (
                <span className="flex items-center gap-1">
                  🎯 {mainBlock.target_pace}
                </span>
              )}
            </div>
          )}
        </div>
        <span className={`text-[var(--color-primary-400)] text-xl transition-transform ${showBlocks ? 'rotate-90' : ''}`}>
          →
        </span>
      </div>

      {showBlocks && (
        <div className="mt-4 space-y-3 border-t border-[var(--color-border-dark)] pt-4">
          {workout.blocks.map((block, i) => (
            <div
              key={i}
              className="rounded-lg bg-[var(--color-surface-dark)] p-3"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-semibold text-[var(--color-text-primary)] capitalize">
                  {blockTypeIcons[block.type] ?? '📌'} {block.type}
                </span>
                <span className="text-xs text-[var(--color-text-tertiary)]">
                  {block.duration_minutes} min | {block.distance_km} km
                </span>
              </div>
              <p className="text-xs text-[var(--color-text-secondary)]">
                {block.description}
              </p>
              {block.target_pace && (
                <span className="mt-1 inline-block text-xs text-[var(--color-primary-neon)]">
                  Pace: {block.target_pace}
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </Card>
  )
}
