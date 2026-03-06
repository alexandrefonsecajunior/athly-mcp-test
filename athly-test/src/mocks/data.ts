import type { ScheduledWorkout, WeekPlan } from "@/types";

function getNextMonday(): Date {
  const d = new Date();
  const day = d.getDay();
  const daysUntilMonday = day === 0 ? 1 : 8 - day;
  d.setDate(d.getDate() + daysUntilMonday);
  return d;
}

function toISO(d: Date): string {
  return d.toISOString().split("T")[0];
}

function addDays(d: Date, n: number): Date {
  const r = new Date(d);
  r.setDate(r.getDate() + n);
  return r;
}

const monday = getNextMonday();

export const mockWorkouts: ScheduledWorkout[] = [
  {
    scheduled_date: toISO(monday),
    day_of_week: "Monday",
    title: "Recovery Run",
    workout_type: "Recovery",
    intensity: "easy",
    total_distance_km: 5.2,
    total_duration_minutes: 35,
    blocks: [
      { type: "warmup", duration_minutes: 10, distance_km: 1.2, target_pace: "7:30 /km", description: "Very light jog to loosen up." },
      { type: "workout", duration_minutes: 20, distance_km: 2.8, target_pace: "6:30 /km", description: "Easy recovery at conversational pace." },
      { type: "cooldown", duration_minutes: 5, distance_km: 1.2, target_pace: "7:30 /km", description: "Walk + gentle stretches." },
    ],
  },
  {
    scheduled_date: toISO(addDays(monday, 1)),
    day_of_week: "Tuesday",
    title: "Interval Training",
    workout_type: "Intervals",
    intensity: "high",
    total_distance_km: 6.8,
    total_duration_minutes: 40,
    blocks: [
      { type: "warmup", duration_minutes: 10, distance_km: 1.5, target_pace: "7:00 /km", description: "Easy jog + strides." },
      { type: "workout", duration_minutes: 25, distance_km: 4.0, target_pace: "5:00 /km", description: "4x400m repeats at 5k pace." },
      { type: "cooldown", duration_minutes: 5, distance_km: 1.3, target_pace: "7:00 /km", description: "Easy jog cooldown." },
    ],
  },
  {
    scheduled_date: toISO(addDays(monday, 2)),
    day_of_week: "Wednesday",
    title: "Tempo Run",
    workout_type: "Tempo",
    intensity: "moderate",
    total_distance_km: 8.0,
    total_duration_minutes: 45,
    blocks: [
      { type: "warmup", duration_minutes: 10, distance_km: 1.5, target_pace: "7:00 /km", description: "Easy jog warmup." },
      { type: "workout", duration_minutes: 30, distance_km: 5.5, target_pace: "5:30 /km", description: "Sustained comfortably hard effort." },
      { type: "cooldown", duration_minutes: 5, distance_km: 1.0, target_pace: "7:00 /km", description: "Easy jog + stretches." },
    ],
  },
  {
    scheduled_date: toISO(addDays(monday, 3)),
    day_of_week: "Thursday",
    title: "Easy Aerobic Run",
    workout_type: "Easy",
    intensity: "easy",
    total_distance_km: 6.0,
    total_duration_minutes: 40,
    blocks: [
      { type: "warmup", duration_minutes: 10, distance_km: 1.3, target_pace: "7:30 /km", description: "Slow jog to warm up." },
      { type: "workout", duration_minutes: 25, distance_km: 3.7, target_pace: "6:30 /km", description: "Steady aerobic run in Zone 2." },
      { type: "cooldown", duration_minutes: 5, distance_km: 1.0, target_pace: "7:30 /km", description: "Walk + foam rolling." },
    ],
  },
  {
    scheduled_date: toISO(addDays(monday, 4)),
    day_of_week: "Friday",
    title: "Long Run",
    workout_type: "Long Run",
    intensity: "moderate",
    total_distance_km: 12.0,
    total_duration_minutes: 70,
    blocks: [
      { type: "warmup", duration_minutes: 10, distance_km: 1.5, target_pace: "7:00 /km", description: "Easy jog to settle into rhythm." },
      { type: "workout", duration_minutes: 55, distance_km: 9.5, target_pace: "5:45 /km", description: "Build aerobic base at conversational pace." },
      { type: "cooldown", duration_minutes: 5, distance_km: 1.0, target_pace: "7:00 /km", description: "Easy walk + full-body stretch." },
    ],
  },
];

export const mockWeekPlan: WeekPlan = {
  _id: "mock-plan-1",
  week_start: toISO(monday),
  week_end: toISO(addDays(monday, 4)),
  created_at: new Date().toISOString(),
  analysis: {
    runs_analyzed: 5,
    period: "last 2 weeks",
    avg_distance_km: 7.0,
    avg_pace: "6:00 /km",
    avg_heart_rate: 145,
    total_distance_km: 35.0,
    trend: "maintaining",
  },
  workouts: mockWorkouts,
};
