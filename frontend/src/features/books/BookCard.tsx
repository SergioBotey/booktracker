import type { Book } from "../../types/book";
import { getRatingStars } from "../../utils/bookFormatters";
import { BookStatusBadge } from "./BookStatusBadge";

interface BookCardProps {
  book: Book;
}

export function BookCard({ book }: BookCardProps) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">{book.title}</h2>
          <p className="mt-1 text-sm text-slate-500">{book.author}</p>
        </div>

        <BookStatusBadge status={book.status} />
      </div>

      {book.genre && (
        <p className="mt-3 text-sm text-slate-600">
          <span className="font-medium">Género:</span> {book.genre}
        </p>
      )}

      <p className="mt-3 text-sm text-amber-600">
        {getRatingStars(book.rating)}
      </p>

      {book.pageCount && (
        <p className="mt-2 text-sm text-slate-500">
          {book.pageCount} páginas
        </p>
      )}

      {book.notes && (
        <p className="mt-4 line-clamp-3 text-sm text-slate-600">
          {book.notes}
        </p>
      )}
    </article>
  );
}