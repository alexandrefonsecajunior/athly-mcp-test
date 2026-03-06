import type { WeekPlan, PlannerResults } from '../types'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Request failed' }))
    throw new Error(error.message || error.error || `HTTP ${response.status}`)
  }

  return response.json()
}

export function getLatestPlan(): Promise<WeekPlan | null> {
  return request<WeekPlan | null>('/api/week-plans/latest')
}

export function getAllPlans(): Promise<WeekPlan[]> {
  return request<WeekPlan[]>('/api/week-plans')
}

export function getPlanById(id: string): Promise<WeekPlan> {
  return request<WeekPlan>(`/api/week-plans/${id}`)
}

export function generatePlan(numberOfRuns?: number, weekStartDate?: string): Promise<PlannerResults> {
  return request<PlannerResults>('/api/plan-next-week', {
    method: 'POST',
    body: JSON.stringify({ numberOfRuns: numberOfRuns ?? 5, weekStartDate }),
  })
}
