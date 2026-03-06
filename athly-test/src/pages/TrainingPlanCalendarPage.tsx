import { useState, useEffect } from "react";
import { Section } from "@/components/layout";
import { GradientText } from "@/components/ui/GradientText";
import { Button } from "@/components/ui/Button";
import { TrainingPlanCalendar } from "@/components/Calendar/TrainingPlanCalendar";
import { usePlanStore } from "@/store/planStore";
import { getAllWeekPlans } from "@/services/planService";

export function TrainingPlanCalendarPage() {
  const [currentMonth, setCurrentMonth] = useState(() => new Date());
  const { allPlans, setAllPlans, setLoading } = usePlanStore();

  useEffect(() => {
    setLoading(true);
    getAllWeekPlans()
      .then(setAllPlans)
      .finally(() => setLoading(false));
  }, [setAllPlans, setLoading]);

  const goPrev = () => {
    setCurrentMonth((d) => new Date(d.getFullYear(), d.getMonth() - 1));
  };

  const goNext = () => {
    setCurrentMonth((d) => new Date(d.getFullYear(), d.getMonth() + 1));
  };

  const goToday = () => {
    setCurrentMonth(new Date());
  };

  const monthYearLabel = currentMonth.toLocaleDateString("pt-BR", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="space-y-8">
      <Section spacing="md">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <GradientText variant="primary">
              <h1 className="text-3xl md:text-4xl font-bold">Calendario</h1>
            </GradientText>
            <p className="mt-2 text-lg text-[var(--color-text-secondary)]">
              Plano de treino em vista de mes
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={goPrev} className="shrink-0">
              &larr; Anterior
            </Button>
            <Button variant="primary" size="sm" onClick={goToday} className="shrink-0">
              Hoje
            </Button>
            <Button variant="outline" size="sm" onClick={goNext} className="shrink-0">
              Proximo &rarr;
            </Button>
          </div>
        </div>

        <p className="mt-4 text-xl font-semibold capitalize text-[var(--color-text-primary)]">
          {monthYearLabel}
        </p>
      </Section>

      <TrainingPlanCalendar
        currentMonth={currentMonth}
        plans={allPlans}
      />
    </div>
  );
}
