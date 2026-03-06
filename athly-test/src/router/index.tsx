import { createBrowserRouter, Navigate } from "react-router-dom";
import { MainLayout } from "@/layouts/MainLayout";
import { DashboardPage } from "@/pages/DashboardPage";
import { PlanPage } from "@/pages/PlanPage";
import { TrainingPlanCalendarPage } from "@/pages/TrainingPlanCalendarPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: "dashboard", element: <DashboardPage /> },
      { path: "plan", element: <PlanPage /> },
      { path: "training-plan", element: <TrainingPlanCalendarPage /> },
    ],
  },
  { path: "*", element: <Navigate to="/dashboard" replace /> },
]);
