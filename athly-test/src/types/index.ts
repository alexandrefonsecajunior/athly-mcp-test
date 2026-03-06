export interface WorkoutBlock {
  type: string
  duration_minutes: number
  distance_km: number
  target_pace: string
  description: string
}

export interface ScheduledWorkout {
  scheduled_date: string
  day_of_week: string
  title: string
  workout_type: string
  intensity: string
  total_distance_km: number
  total_duration_minutes: number
  blocks: WorkoutBlock[]
}

export interface PlannerAnalysis {
  runs_analyzed: number
  period: string
  avg_distance_km: number
  avg_pace: string
  avg_heart_rate: number | null
  total_distance_km: number
  trend: string
}

export interface WeekPlan {
  _id?: string
  week_start: string
  week_end: string
  created_at: string
  analysis: PlannerAnalysis
  workouts: ScheduledWorkout[]
}

export interface PlannerResults {
  week_start: string
  week_end: string
  analysis: PlannerAnalysis
  workouts: ScheduledWorkout[]
  saved_id?: string
}
