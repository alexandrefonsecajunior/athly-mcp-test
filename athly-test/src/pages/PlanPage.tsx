import { useEffect, useState } from "react";
import { Card, GradientText, Badge, Divider } from "@/components/ui";
import { Button } from "@/components/ui/Button";
import { WorkoutCard } from "@/components/WorkoutCard";
import { SkeletonWorkout } from "@/components/ui/Skeleton";
import { Section } from "@/components/layout";
import { usePlanStore } from "@/store/planStore";
import { getLatestWeekPlan, generateNextWeekPlan } from "@/services/planService";

export function PlanPage() {
  const { currentPlan, setCurrentPlan, isLoading, setLoading } = usePlanStore();
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    setLoading(true);
    getLatestWeekPlan()
      .then(setCurrentPlan)
      .finally(() => setLoading(false));
  }, [setCurrentPlan, setLoading]);

  const handleGenerate = async () => {
    setGenerating(true);
    try {
      await generateNextWeekPlan();
      const plan = await getLatestWeekPlan();
      setCurrentPlan(plan);
    } catch (error) {
      console.error("Failed to generate plan:", error);
    } finally {
      setGenerating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <SkeletonWorkout />
        <SkeletonWorkout />
      </div>
    );
  }

  const workouts = currentPlan?.workouts ?? [];
  const today = new Date().toISOString().split("T")[0];
  const passedCount = workouts.filter((w) => w.scheduled_date <= today).length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <Section spacing="md">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <GradientText variant="primary">
              <h1 className="text-3xl md:text-4xl font-bold">Plano de Treino</h1>
            </GradientText>
            <p className="mt-2 text-lg text-[var(--color-text-secondary)]">
              {currentPlan
                ? `${currentPlan.week_start} a ${currentPlan.week_end}`
                : "Nenhum plano ativo"}
            </p>
          </div>
          <div className="flex gap-2">
            {currentPlan && (
              <Badge variant="neon" size="lg">
                📅 {workouts.length} treinos
              </Badge>
            )}
            <Button
              variant="gradient"
              size="sm"
              onClick={handleGenerate}
              disabled={generating}
            >
              {generating ? "Gerando..." : "🔄 Gerar Novo Plano"}
            </Button>
          </div>
        </div>
      </Section>

      {/* Week Stats */}
      {currentPlan && (
        <Card variant="gradient" padding="lg">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h3 className="text-sm font-semibold text-[var(--color-text-tertiary)] uppercase mb-1">
                Progresso
              </h3>
              <p className="text-3xl font-bold text-gradient">
                {passedCount} de {workouts.length}
              </p>
              <p className="text-sm text-[var(--color-text-secondary)] mt-1">
                dias passados
              </p>
            </div>
            <div className="text-right">
              <div className="text-5xl mb-2">
                {passedCount >= workouts.length ? "🏆" : "💪"}
              </div>
              {currentPlan.analysis && (
                <Badge variant="success" size="sm">
                  {currentPlan.analysis.trend}
                </Badge>
              )}
            </div>
          </div>
        </Card>
      )}

      <Divider variant="gradient" />

      {/* Workouts */}
      <Section
        title="Treinos da Semana"
        subtitle={`${workouts.length} treinos programados`}
        spacing="md"
      >
        <div className="space-y-4">
          {workouts.length === 0 ? (
            <Card variant="default" padding="lg">
              <div className="text-center py-8">
                <span className="text-6xl mb-4 block">📭</span>
                <h3 className="text-xl font-bold text-gradient mb-2">
                  Nenhum treino
                </h3>
                <p className="text-[var(--color-text-secondary)] mb-4">
                  Gere um plano semanal para comecar
                </p>
                <Button
                  variant="gradient"
                  size="lg"
                  glow
                  onClick={handleGenerate}
                  disabled={generating}
                >
                  {generating ? "Gerando..." : "🚀 Gerar Plano"}
                </Button>
              </div>
            </Card>
          ) : (
            workouts.map((workout, index) => (
              <div key={index} className="relative">
                {workout.scheduled_date === today && (
                  <Badge variant="neon" size="sm" className="absolute -top-2 left-4 z-10">
                    Hoje
                  </Badge>
                )}
                <WorkoutCard workout={workout} showBlocks />
              </div>
            ))
          )}
        </div>
      </Section>
    </div>
  );
}
