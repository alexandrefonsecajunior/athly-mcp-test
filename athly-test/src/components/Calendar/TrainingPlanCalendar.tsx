import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import type { ScheduledWorkout, WeekPlan } from "@/types";

const WEEKDAY_LABELS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];

function toISO(date: Date): string {
  return date.toISOString().split("T")[0];
}

function getMonthGrid(year: number, month: number): { date: Date; iso: string; isCurrentMonth: boolean }[][] {
  const first = new Date(year, month, 1);
  const last = new Date(year, month + 1, 0);
  const startOffset = first.getDay();
  const daysInMonth = last.getDate();

  const weeks: { date: Date; iso: string; isCurrentMonth: boolean }[][] = [];
  let week: { date: Date; iso: string; isCurrentMonth: boolean }[] = [];
  const totalCells = Math.ceil((startOffset + daysInMonth) / 7) * 7;

  for (let i = 0; i < totalCells; i++) {
    const dayIndex = i - startOffset;
    const d = new Date(year, month, 1 + dayIndex);
    const iso = toISO(d);
    const isCurrentMonth = d.getMonth() === month;
    week.push({ date: d, iso, isCurrentMonth });
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }
  if (week.length > 0) weeks.push(week);

  return weeks;
}

function buildWorkoutMap(plans: WeekPlan[]): Record<string, ScheduledWorkout[]> {
  const map: Record<string, ScheduledWorkout[]> = {};
  for (const plan of plans) {
    for (const workout of plan.workouts) {
      const key = workout.scheduled_date;
      if (!map[key]) map[key] = [];
      map[key].push(workout);
    }
  }
  return map;
}

function findPlanForWeek(plans: WeekPlan[], weekStart: string, weekEnd: string): WeekPlan | undefined {
  return plans.find(
    (p) => p.week_start <= weekEnd && p.week_end >= weekStart
  );
}

const typeColors: Record<string, string> = {
  Recovery: 'border-green-500/50 bg-green-500/10',
  Intervals: 'border-red-500/50 bg-red-500/10',
  Tempo: 'border-yellow-500/50 bg-yellow-500/10',
  Easy: 'border-blue-500/50 bg-blue-500/10',
  'Long Run': 'border-purple-500/50 bg-purple-500/10',
}

interface TrainingPlanCalendarProps {
  currentMonth: Date;
  plans: WeekPlan[];
}

export function TrainingPlanCalendar({
  currentMonth,
  plans,
}: TrainingPlanCalendarProps) {
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const grid = getMonthGrid(year, month);
  const workoutMap = buildWorkoutMap(plans);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-7 rounded-xl border border-[var(--color-border-dark)] bg-[var(--color-surface-card)] overflow-hidden">
        {/* Day headers */}
        {WEEKDAY_LABELS.map((label) => (
          <div
            key={label}
            className="border-b border-r border-[var(--color-border-dark)] bg-[var(--color-surface-dark)] px-2 py-3 text-center text-xs font-semibold uppercase text-[var(--color-text-tertiary)] last:border-r-0"
          >
            {label}
          </div>
        ))}

        {grid.map((week, weekIndex) => {
          const weekStart = week[0].iso;
          const weekEnd = week[week.length - 1].iso;
          const weekPlan = findPlanForWeek(plans, weekStart, weekEnd);
          const summaryLabel = weekPlan
            ? `${weekPlan.analysis.avg_distance_km} km avg | ${weekPlan.analysis.avg_pace} | ${weekPlan.analysis.trend}`
            : null;

          return (
            <div key={weekIndex} className="contents">
              {/* Weekly summary bar */}
              <div className="col-span-7 border-b border-[var(--color-border-dark)] bg-[var(--color-surface-dark)] px-3 py-2">
                {summaryLabel ? (
                  <span className="rounded-lg border border-[var(--color-primary-500)] bg-gradient-to-r from-[var(--color-primary-500)]/20 to-[var(--color-secondary-500)]/20 px-3 py-1.5 text-xs font-semibold text-[var(--color-text-primary)]">
                    {summaryLabel}
                  </span>
                ) : (
                  <span className="text-xs text-[var(--color-text-tertiary)]">
                    —
                  </span>
                )}
              </div>

              {/* Day cells */}
              {week.map(({ date, iso, isCurrentMonth }) => {
                const dayWorkouts = workoutMap[iso] ?? [];
                const isToday = toISO(new Date()) === iso;

                return (
                  <div
                    key={iso}
                    className={`min-h-[100px] border-b border-r border-[var(--color-border-dark)] bg-[var(--color-surface-card)] p-2 last:border-r-0 ${
                      !isCurrentMonth ? "opacity-50" : ""
                    } ${isToday ? "ring-1 ring-inset ring-[var(--color-primary-500)]" : ""}`}
                  >
                    <div
                      className={`mb-2 text-sm font-semibold ${
                        isToday
                          ? "flex h-7 w-7 items-center justify-center rounded-full bg-[var(--color-primary-500)] text-white"
                          : "text-[var(--color-text-secondary)]"
                      }`}
                    >
                      {date.getDate()}
                    </div>
                    <div className="space-y-1.5">
                      {dayWorkouts.map((workout, i) => (
                        <Card
                          key={i}
                          variant="flat"
                          padding="sm"
                          className={`border ${typeColors[workout.workout_type] ?? ''}`}
                        >
                          <div className="flex flex-col gap-1">
                            <span className="truncate text-xs font-medium text-[var(--color-text-primary)]">
                              {workout.title}
                            </span>
                            <div className="flex items-center gap-1">
                              <Badge variant="secondary" size="sm" className="text-[10px] px-1 py-0">
                                {workout.total_distance_km}km
                              </Badge>
                              <Badge variant="secondary" size="sm" className="text-[10px] px-1 py-0">
                                {workout.total_duration_minutes}min
                              </Badge>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
