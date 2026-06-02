import { Link } from "react-router-dom";
import type { RecentBook } from "../../types/dashboard";
import {
  formatDate,
  getRatingStars
} from "../../utils/bookFormatters";
import { BookStatusBadge } from "../books/BookStatusBadge";

interface RecentBooksCardProps {
  books: RecentBook[];
}

export function RecentBooksCard({ books }: RecentBooksCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            Últimos libros agregados
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Tus registros más recientes en BookTracker.
          </p>
        </div>

        <Link
          to="/books"
          className="rounded-xl border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
        >
          Ver biblioteca
        </Link>
      </div>

      {books.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-slate-300 p-6 text-center">
          <p className="text-sm font-medium text-slate-700">
            Aún no tienes libros recientes.
          </p>
          <p className="mt-1 text-sm text-slate-500">
            Agrega tu primer libro para verlo aquí.
          </p>
        </div>
      ) : (
        <div className="mt-5 divide-y divide-slate-100">
          {books.map((book) => (
            <div
              key={book.id}
              className="flex flex-col gap-3 py-4 md:flex-row md:items-center md:justify-between"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-900">
                  {book.title}
                </p>

                <p className="mt-1 truncate text-sm text-slate-500">
                  {book.author}
                  {book.genre ? ` · ${book.genre}` : ""}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Agregado: {formatDate(book.createdAt)}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm text-amber-600">
                  {getRatingStars(book.rating)}
                </span>

                <BookStatusBadge status={book.status} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}