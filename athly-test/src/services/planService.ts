import type { WeekPlan, PlannerResults } from '@/types'
import { getLatestPlan, getAllPlans, generatePlan } from './api'

export async function getLatestWeekPlan(): Promise<WeekPlan | null> {
  try {
    return await getLatestPlan()
  } catch (error) {
    console.error('Failed to get latest week plan:', error)
    return null
  }
}

export async function generateNextWeekPlan(): Promise<PlannerResults> {
  return generatePlan()
}

export async function getAllWeekPlans(): Promise<WeekPlan[]> {
  try {
    return await getAllPlans()
  } catch (error) {
    console.error('Failed to get all week plans:', error)
    return []
  }
}
