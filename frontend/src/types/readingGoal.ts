export interface ReadingGoal {
  id: number;
  year: number;
  targetBooks: number;
  completedBooks: number;
  remainingBooks: number;
  progressPercentage: number;
  createdAt: string;
  updatedAt?: string | null;
}

export interface CreateReadingGoalRequest {
  year: number;
  targetBooks: number;
}

export interface UpdateReadingGoalRequest {
  targetBooks: number;
}