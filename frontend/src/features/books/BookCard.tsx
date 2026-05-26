import type { Book } from "../../types/book";
import {
  formatDate,
  formatPageCount,
  getRatingStars,
} from "../../utils/bookFormatters";
import { BookStatusBadge } from "./BookStatusBadge";

interface BookCardProps {
  book: Book;
  onView: (book: Book) => void;
  onEdit: (book: Book) => void;
  onDelete: (book: Book) => void;
}

export function BookCard({ book, onView, onEdit, onDelete }: BookCardProps) {
  return (
    <article className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h2 className="truncate text-lg font-bold text-slate-900">
            {book.title}
          </h2>
          <p className="mt-1 truncate text-sm text-slate-500">
            {book.author}
          </p>
        </div>

        <BookStatusBadge status={book.status} />
      </div>

      <div className="mt-4 grid gap-3 text-sm text-slate-600">
        {book.genre && (
          <p>
            <span className="font-medium text-slate-700">Género:</span>{" "}
            {book.genre}
          </p>
        )}

        <p>
          <span className="font-medium text-slate-700">Calificación:</span>{" "}
          <span className="text-amber-600">{getRatingStars(book.rating)}</span>
        </p>

        <p>
          <span className="font-medium text-slate-700">Páginas:</span>{" "}
          {formatPageCount(book.pageCount)}
        </p>

        <p>
          <span className="font-medium text-slate-700">Inicio:</span>{" "}
          {formatDate(book.startDate)}
        </p>
      </div>

      {book.notes && (
        <p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-600">
          {book.notes}
        </p>
      )}

      <div className="mt-5 flex flex-wrap gap-2">
        <button
          onClick={() => onView(book)}
          className="rounded-xl border border-indigo-200 px-3 py-2 text-sm font-medium text-indigo-700 hover:bg-indigo-50"
        >
          Ver detalle
        </button>

        <button
          onClick={() => onEdit(book)}
          className="rounded-xl border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
        >
          Editar
        </button>

        <button
          onClick={() => onDelete(book)}
          className="rounded-xl border border-red-200 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
        >
          Eliminar
        </button>
      </div>
    </article>
  );
}