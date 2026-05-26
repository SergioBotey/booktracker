import { useEffect, useState } from "react";
import { createBook, deleteBook, getBooks, updateBook } from "../api/booksApi";
import { BookCard } from "../features/books/BookCard";
import { BookFilters } from "../features/books/BookFilters";
import { BookForm } from "../features/books/BookForm";
import { ConfirmDeleteBookModal } from "../features/books/ConfirmDeleteBookModal";
import { BookDetailModal } from "../features/books/BookDetailModal";
import type {
  Book,
  BookFilterRequest,
  CreateBookRequest,
  UpdateBookRequest,
} from "../types/book";
import { getApiErrorMessage } from "../utils/getApiErrorMessage";

type FormMode = "create" | "edit";

export function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [formMode, setFormMode] = useState<FormMode>("create");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [bookToDelete, setBookToDelete] = useState<Book | null>(null);
  const [bookToView, setBookToView] = useState<Book | null>(null);
  const [filters, setFilters] = useState<BookFilterRequest>({
    search: "",
    genre: "",
    status: "",
  });
  const [error, setError] = useState<string | null>(null);

  async function loadBooks(currentFilters: BookFilterRequest = filters) {
    try {
      setError(null);
      setIsLoading(true);

      const data = await getBooks({
        search: currentFilters.search?.trim() || undefined,
        genre: currentFilters.genre?.trim() || undefined,
        status: currentFilters.status || undefined,
      });

      setBooks(data);
    } catch (error) {
      setError(getApiErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }

  function handleSearch() {
    loadBooks(filters);
  }

  function handleClearFilters() {
    const emptyFilters: BookFilterRequest = {
      search: "",
      genre: "",
      status: "",
    };

    setFilters(emptyFilters);
    loadBooks(emptyFilters);
  }

  function openCreateForm() {
    setFormMode("create");
    setSelectedBook(null);
    setIsFormOpen(true);
  }

  function openEditForm(book: Book) {
    setFormMode("edit");
    setSelectedBook(book);
    setIsFormOpen(true);
  }

  function closeForm() {
    setIsFormOpen(false);
    setSelectedBook(null);
    setFormMode("create");
  }

  function handleEditFromDetail(book: Book) {
    setBookToView(null);
    openEditForm(book);
  }

  async function handleSubmitBook(values: CreateBookRequest) {
    try {
      setError(null);
      setIsSaving(true);

      if (formMode === "create") {
        await createBook(values);
        await loadBooks(filters);
        closeForm();
        return;
      }

      if (!selectedBook) {
        return;
      }

      const updateRequest: UpdateBookRequest = values;

      await updateBook(selectedBook.id, updateRequest);
      await loadBooks(filters);

      closeForm();
    } catch (error) {
      setError(getApiErrorMessage(error));
    } finally {
      setIsSaving(false);
    }
  }

  async function handleConfirmDelete() {
    if (!bookToDelete) {
      return;
    }

    try {
      setError(null);
      setIsDeleting(true);

      await deleteBook(bookToDelete.id);
      await loadBooks(filters);

      setBookToDelete(null);
    } catch (error) {
      setError(getApiErrorMessage(error));
    } finally {
      setIsDeleting(false);
    }
  }

  const hasActiveFilters =
    Boolean(filters.search?.trim()) ||
    Boolean(filters.genre?.trim()) ||
    Boolean(filters.status);

  useEffect(() => {
    loadBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const totalBooks = books.length;
  const completedBooks = books.filter((book) => book.status === 3).length;
  const readingBooks = books.filter((book) => book.status === 2).length;

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
          onClick={isFormOpen ? closeForm : openCreateForm}
          className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
        >
          {isFormOpen ? "Cerrar formulario" : "Agregar libro"}
        </button>
      </div>

      <BookFilters
        filters={filters}
        onChange={setFilters}
        onSearch={handleSearch}
        onClear={handleClearFilters}
        isLoading={isLoading}
      />

      {!isLoading && (
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Resultados actuales</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">{totalBooks}</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Leyendo</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">{readingBooks}</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Leídos</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">{completedBooks}</p>
          </div>
        </div>
      )}

      {error && (
        <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {isFormOpen && (
        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">
            {formMode === "create" ? "Nuevo libro" : "Editar libro"}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {formMode === "create"
              ? "Registra un libro en tu biblioteca personal."
              : "Actualiza la información de tu libro."}
          </p>

          <div className="mt-6">
            <BookForm
              initialBook={selectedBook}
              onSubmit={handleSubmitBook}
              isSubmitting={isSaving}
              submitLabel={
                formMode === "create" ? "Guardar libro" : "Actualizar libro"
              }
            />
          </div>
        </section>
      )}

      <section className="mt-6">
        {!isLoading && (
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-slate-500">
              {books.length === 1
                ? "1 libro encontrado"
                : `${books.length} libros encontrados`}
            </p>
          </div>
        )}

        {isLoading && (
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-sm text-slate-500">
            Cargando libros...
          </div>
        )}

        {!isLoading && books.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
            <h2 className="text-lg font-semibold text-slate-900">
              {hasActiveFilters
                ? "No se encontraron libros"
                : "No tienes libros registrados"}
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              {hasActiveFilters
                ? "Prueba cambiando los filtros o limpiando la búsqueda."
                : "Empieza agregando tu primer libro a BookTracker."}
            </p>

            {hasActiveFilters && (
              <button
                onClick={handleClearFilters}
                className="mt-4 rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
              >
                Limpiar filtros
              </button>
            )}
          </div>
        )}

        {!isLoading && books.length > 0 && (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {books.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onView={setBookToView}
                onEdit={openEditForm}
                onDelete={setBookToDelete}
              />
            ))}
          </div>
        )}
      </section>

      {bookToDelete && (
        <ConfirmDeleteBookModal
          book={bookToDelete}
          isDeleting={isDeleting}
          onCancel={() => setBookToDelete(null)}
          onConfirm={handleConfirmDelete}
        />
      )}

      {bookToView && (
        <BookDetailModal
          book={bookToView}
          onClose={() => setBookToView(null)}
          onEdit={handleEditFromDetail}
        />
      )}

    </div>
  );
}