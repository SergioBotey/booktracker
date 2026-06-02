import type { BookRating, ReadingStatus } from "./book";

export interface DashboardSummary {
  totalBooks: number;
  pendingBooks: number;
  readingBooks: number;
  completedBooks: number;
  abandonedBooks: number;
  averageRating: number;
  totalPagesRead: number;
}

export interface RecentBook {
  id: number;
  title: string;
  author: string;
  genre?: string | null;
  status: ReadingStatus;
  rating?: BookRating | null;
  createdAt: string;
}