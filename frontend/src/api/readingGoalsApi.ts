import { apiClient } from "./apiClient";
import type {
  CreateReadingGoalRequest,
  ReadingGoal,
  UpdateReadingGoalRequest,
} from "../types/readingGoal";

export async function getCurrentReadingGoal(): Promise<ReadingGoal | null> {
  try {
    const response = await apiClient.get<ReadingGoal>("/reading-goals/current");

    return response.data;
  } catch (error: any) {
    if (error.response?.status === 404) {
      return null;
    }

    throw error;
  }
}

export async function createReadingGoal(
  request: CreateReadingGoalRequest
): Promise<ReadingGoal> {
  const response = await apiClient.post<ReadingGoal>(
    "/reading-goals",
    request
  );

  return response.data;
}

export async function updateReadingGoal(
  id: number,
  request: UpdateReadingGoalRequest
): Promise<ReadingGoal> {
  const response = await apiClient.put<ReadingGoal>(
    `/reading-goals/${id}`,
    request
  );

  return response.data;
}