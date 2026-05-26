import { apiClient } from "./apiClient";
import type {
  Book,
  BookFilterRequest,
  CreateBookRequest,
  UpdateBookRequest,
} from "../types/book";

export async function getBooks(filters?: BookFilterRequest): Promise<Book[]> {
  const response = await apiClient.get<Book[]>("/books", {
    params: {
      search: filters?.search || undefined,
      genre: filters?.genre || undefined,
      status: filters?.status || undefined,
    },
  });

  return response.data;
}

export async function getBookById(id: number): Promise<Book> {
  const response = await apiClient.get<Book>(`/books/${id}`);
  return response.data;
}

export async function createBook(request: CreateBookRequest): Promise<Book> {
  const response = await apiClient.post<Book>("/books", request);
  return response.data;
}

export async function updateBook(
  id: number,
  request: UpdateBookRequest
): Promise<Book> {
  const response = await apiClient.put<Book>(`/books/${id}`, request);
  return response.data;
}

export async function deleteBook(id: number): Promise<void> {
  await apiClient.delete(`/books/${id}`);
}