import type { Book } from "../../types/book";
import {
  formatDate,
  formatPageCount,
  getRatingStars,
} from "../../utils/bookFormatters";
import { BookStatusBadge } from "./BookStatusBadge";

interface BookDetailModalProps {
  book: Book;
  onClose: () => void;
  onEdit: (book: Book) => void;
}

export function BookDetailModal({
  book,
  onClose,
  onEdit,
}: BookDetailModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-indigo-600">Detalle</p>
            <h2 className="mt-1 text-2xl font-bold text-slate-900">
              {book.title}
            </h2>
            <p className="mt-1 text-sm text-slate-500">{book.author}</p>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            Cerrar
          </button>
        </div>

        <div className="mt-5">
          <BookStatusBadge status={book.status} />
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Género
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-800">
              {book.genre || "No definido"}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Calificación
            </p>
            <p className="mt-1 text-sm font-semibold text-amber-600">
              {getRatingStars(book.rating)}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Páginas
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-800">
              {formatPageCount(book.pageCount)}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Creado
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-800">
              {formatDate(book.createdAt)}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Fecha inicio
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-800">
              {formatDate(book.startDate)}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Fecha fin
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-800">
              {formatDate(book.endDate)}
            </p>
          </div>
        </div>

        {book.description && (
          <section className="mt-6">
            <h3 className="text-sm font-bold text-slate-900">Descripción</h3>
            <p className="mt-2 whitespace-pre-line text-sm leading-6 text-slate-600">
              {book.description}
            </p>
          </section>
        )}

        {book.notes && (
          <section className="mt-6">
            <h3 className="text-sm font-bold text-slate-900">Notas</h3>
            <p className="mt-2 whitespace-pre-line text-sm leading-6 text-slate-600">
              {book.notes}
            </p>
          </section>
        )}

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={() => onEdit(book)}
            className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            Editar libro
          </button>
        </div>
      </div>
    </div>
  );
}