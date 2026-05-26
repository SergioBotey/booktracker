export enum ReadingStatus {
  Pending = 1,
  Reading = 2,
  Completed = 3,
  Abandoned = 4,
}

export enum BookRating {
  One = 1,
  Two = 2,
  Three = 3,
  Four = 4,
  Five = 5,
}

export interface Book {
  id: number;
  title: string;
  author: string;
  genre?: string | null;
  description?: string | null;
  coverUrl?: string | null;
  status: ReadingStatus;
  rating?: BookRating | null;
  pageCount?: number | null;
  startDate?: string | null;
  endDate?: string | null;
  notes?: string | null;
  createdAt: string;
  updatedAt?: string | null;
}

export interface CreateBookRequest {
  title: string;
  author: string;
  genre?: string;
  description?: string;
  coverUrl?: string;
  status: ReadingStatus;
  rating?: BookRating | null;
  pageCount?: number | null;
  startDate?: string | null;
  endDate?: string | null;
  notes?: string;
}

export interface UpdateBookRequest {
  title: string;
  author: string;
  genre?: string;
  description?: string;
  coverUrl?: string;
  status: ReadingStatus;
  rating?: BookRating | null;
  pageCount?: number | null;
  startDate?: string | null;
  endDate?: string | null;
  notes?: string;
}

export interface BookFilterRequest {
  search?: string;
  genre?: string;
  status?: ReadingStatus | "";
}