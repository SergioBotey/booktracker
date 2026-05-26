import type { Book } from "../../types/book";

interface ConfirmDeleteBookModalProps {
  book: Book;
  isDeleting?: boolean;
  onCancel: () => void;
  onConfirm: () => Promise<void>;
}

export function ConfirmDeleteBookModal({
  book,
  isDeleting,
  onCancel,
  onConfirm,
}: ConfirmDeleteBookModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <h2 className="text-lg font-bold text-slate-900">
          Eliminar libro
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          ¿Seguro que deseas eliminar{" "}
          <span className="font-semibold text-slate-900">{book.title}</span>?
          Esta acción no se puede deshacer.
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onCancel}
            disabled={isDeleting}
            className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 disabled:opacity-60"
          >
            Cancelar
          </button>

          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-60"
          >
            {isDeleting ? "Eliminando..." : "Eliminar"}
          </button>
        </div>
      </div>
    </div>
  );
}