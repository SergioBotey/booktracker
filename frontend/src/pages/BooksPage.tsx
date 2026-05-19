import { useEffect, useState } from "react";
import { createBook, getBooks } from "../api/booksApi";
import { BookCard } from "../features/books/BookCard";
import { BookForm } from "../features/books/BookForm";
import type { Book, CreateBookRequest } from "../types/book";
import { getApiErrorMessage } from "../utils/getApiErrorMessage";

export function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function loadBooks() {
    try {
      setError(null);
      setIsLoading(true);

      const data = await getBooks();

      setBooks(data);
    } catch (error) {
      setError(getApiErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }

  async function handleCreateBook(values: CreateBookRequest) {
    try {
      setError(null);
      setIsCreating(true);

      const createdBook = await createBook(values);

      setBooks((currentBooks) => [createdBook, ...currentBooks]);
      setIsFormOpen(false);
    } catch (error) {
      setError(getApiErrorMessage(error));
    } finally {
      setIsCreating(false);
    }
  }

  useEffect(() => {
    loadBooks();
  }, []);

  return (
    <div>
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Biblioteca</h1>
          <p className="mt-2 text-slate-500">
            Gestiona tus libros, estados de lectura, calificaciones y notas.
          </p>
        </div>

        <button
          onClick={() => setIsFormOpen((value) => !value)}
          className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
        >
          {isFormOpen ? "Cerrar formulario" : "Agregar libro"}
        </button>
      </div>

      {error && (
        <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {isFormOpen && (
        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">Nuevo libro</h2>
          <p className="mt-1 text-sm text-slate-500">
            Registra un libro en tu biblioteca personal.
          </p>

          <div className="mt-6">
            <BookForm onSubmit={handleCreateBook} isSubmitting={isCreating} />
          </div>
        </section>
      )}

      <section className="mt-6">
        {isLoading && (
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-sm text-slate-500">
            Cargando libros...
          </div>
        )}

        {!isLoading && books.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
            <h2 className="text-lg font-semibold text-slate-900">
              No tienes libros registrados
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Empieza agregando tu primer libro a BookTracker.
            </p>
          </div>
        )}

        {!isLoading && books.length > 0 && (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}