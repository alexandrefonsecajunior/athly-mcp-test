import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, GradientText, StatCard, ProgressBar, Badge, Divider } from '@/components/ui'
import { Button } from '@/components/ui/Button'
import { WorkoutCard } from '@/components/WorkoutCard'
import { SkeletonWorkout } from '@/components/ui/Skeleton'
import { Section } from '@/components/layout'
import { usePlanStore } from '@/store/planStore'
import { getLatestWeekPlan, generateNextWeekPlan } from '@/services/planService'
import type { ScheduledWorkout } from '@/types'

function toISO(d: Date): string {
  return d.toISOString().split("T")[0]
}

export function DashboardPage() {
  const { currentPlan, setCurrentPlan, isLoading, setLoading } = usePlanStore()
  const [todayWorkout, setTodayWorkout] = useState<ScheduledWorkout | null>(null)
  const [nextWorkout, setNextWorkout] = useState<ScheduledWorkout | null>(null)
  const [generating, setGenerating] = useState(false)

  useEffect(() => {
    setLoading(true)
    getLatestWeekPlan()
      .then((plan) => {
        setCurrentPlan(plan)
        if (plan) {
          const today = toISO(new Date())
          const todayW = plan.workouts.find(w => w.scheduled_date === today) ?? null
          setTodayWorkout(todayW)
          const nextW = plan.workouts.find(w => w.scheduled_date > today) ?? null
          setNextWorkout(nextW)
        }
      })
      .finally(() => setLoading(false))
  }, [setCurrentPlan, setLoading])

  const handleGenerate = async () => {
    setGenerating(true)
    try {
      await generateNextWeekPlan()
      const plan = await getLatestWeekPlan()
      setCurrentPlan(plan)
      if (plan) {
        const today = toISO(new Date())
        setTodayWorkout(plan.workouts.find(w => w.scheduled_date === today) ?? null)
        setNextWorkout(plan.workouts.find(w => w.scheduled_date > today) ?? null)
      }
    } catch (error) {
      console.error('Failed to generate plan:', error)
    } finally {
      setGenerating(false)
    }
  }

  const dayOfWeek = new Date().getDay()
  const daysPassed = dayOfWeek === 0 ? 5 : Math.min(dayOfWeek, 5)
  const progress = (daysPassed / 5) * 100

  return (
    <div className="space-y-8">
      {/* Header */}
      <Section spacing="md">
        <div className="flex items-center gap-3">
          <GradientText variant="neon">
            <h1 className="text-3xl md:text-4xl font-bold">
              Ola, Atleta!
            </h1>
          </GradientText>
          <span className="text-2xl animate-pulse-glow">👋</span>
        </div>
        <p className="mt-2 text-lg text-[var(--color-text-secondary)]">
          Pronto para treinar hoje?
        </p>
      </Section>

      {/* Today's Workout */}
      {isLoading ? (
        <SkeletonWorkout />
      ) : todayWorkout ? (
        <Card variant="glow" padding="lg" className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 gradient-primary opacity-10 blur-3xl rounded-full" />
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <Badge variant="neon" size="lg">Treino de Hoje</Badge>
              <span className="text-4xl">🔥</span>
            </div>
            <WorkoutCard workout={todayWorkout} showBlocks />
          </div>
        </Card>
      ) : (
        <Card variant="gradient" padding="lg">
          <div className="text-center py-8">
            {currentPlan ? (
              <>
                <span className="text-6xl mb-4 block">😴</span>
                <h2 className="text-2xl font-bold text-gradient mb-2">
                  Dia de descanso
                </h2>
                <p className="text-[var(--color-text-secondary)]">
                  Aproveite para recuperar as energias!
                </p>
              </>
            ) : (
              <>
                <span className="text-6xl mb-4 block">📋</span>
                <h2 className="text-2xl font-bold text-gradient mb-2">
                  Nenhum plano encontrado
                </h2>
                <p className="text-[var(--color-text-secondary)] mb-6">
                  Gere um plano semanal baseado nos seus treinos do Strava
                </p>
                <Button
                  variant="gradient"
                  size="lg"
                  glow
                  onClick={handleGenerate}
                  disabled={generating}
                >
                  {generating ? 'Gerando...' : '🚀 Gerar Plano'}
                </Button>
              </>
            )}
          </div>
        </Card>
      )}

      <Divider variant="gradient" />

      {/* Progress */}
      {currentPlan && (
        <Section title="Progresso Semanal" spacing="md">
          <Card padding="lg">
            <ProgressBar
              value={progress}
              variant="gradient"
              showValue
              glow
              size="lg"
            />
            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm text-[var(--color-text-tertiary)]">
                Dia {daysPassed} de 5
              </span>
              <span className="text-lg font-bold text-gradient">
                {currentPlan.analysis.trend}
              </span>
            </div>
          </Card>
        </Section>
      )}

      {/* Stats Grid */}
      {currentPlan && (
        <div className="grid md:grid-cols-3 gap-4">
          <StatCard
            label="Dist. Media"
            value={`${currentPlan.analysis.avg_distance_km} km`}
            icon="📏"
            variant="default"
            gradient
          />
          <StatCard
            label="Pace Medio"
            value={currentPlan.analysis.avg_pace}
            icon="⏱"
          />
          <StatCard
            label="Dist. Total Semana"
            value={`${currentPlan.workouts.reduce((s, w) => s + w.total_distance_km, 0).toFixed(1)} km`}
            icon="🏆"
          />
        </div>
      )}

      {/* Next Workout */}
      {nextWorkout && (
        <Section
          title="Proximo Treino"
          subtitle="Prepare-se para o que vem"
          spacing="md"
        >
          <WorkoutCard workout={nextWorkout} compact />
        </Section>
      )}

      <Divider variant="gradient" spacing="lg" />

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Link to="/plan" className="flex-1">
          <Button variant="outline" fullWidth size="lg">
            📅 Ver plano completo
          </Button>
        </Link>
        <Link to="/training-plan" className="flex-1">
          <Button variant="ghost" fullWidth size="lg">
            📆 Calendario
          </Button>
        </Link>
      </div>
    </div>
  )
}
