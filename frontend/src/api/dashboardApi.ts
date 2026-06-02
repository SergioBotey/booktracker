import { apiClient } from "./apiClient";
import type { DashboardSummary, RecentBook } from "../types/dashboard";

export async function getDashboardSummary(): Promise<DashboardSummary> {
  const response = await apiClient.get<DashboardSummary>("/dashboard/summary");

  return response.data;
}

export async function getRecentBooks(limit = 5): Promise<RecentBook[]> {
  const response = await apiClient.get<RecentBook[]>("/dashboard/recent-books", {
    params: {
      limit,
    },
  });

  return response.data;
}