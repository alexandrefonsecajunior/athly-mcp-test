import { create } from 'zustand'
import type { WeekPlan, ScheduledWorkout } from '@/types'

interface PlanState {
  currentPlan: WeekPlan | null
  allPlans: WeekPlan[]
  todayWorkout: ScheduledWorkout | null
  isLoading: boolean
  setCurrentPlan: (plan: WeekPlan | null) => void
  setAllPlans: (plans: WeekPlan[]) => void
  setTodayWorkout: (workout: ScheduledWorkout | null) => void
  setLoading: (loading: boolean) => void
}

export const usePlanStore = create<PlanState>((set) => ({
  currentPlan: null,
  allPlans: [],
  todayWorkout: null,
  isLoading: false,
  setCurrentPlan: (plan) => set({ currentPlan: plan }),
  setAllPlans: (plans) => set({ allPlans: plans }),
  setTodayWorkout: (workout) => set({ todayWorkout: workout }),
  setLoading: (isLoading) => set({ isLoading }),
}))
