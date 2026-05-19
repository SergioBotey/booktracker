import { apiClient } from "./apiClient";
import type { Book, BookFilterRequest, CreateBookRequest } from "../types/book";

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