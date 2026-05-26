import { Link } from "react-router-dom";

export function DashboardEmptyState() {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
      <h2 className="text-lg font-semibold text-slate-900">
        Tu dashboard todavía está vacío
      </h2>

      <p className="mt-2 text-sm text-slate-500">
        Agrega tu primer libro para empezar a ver métricas de lectura.
      </p>

      <Link
        to="/books"
        className="mt-5 inline-flex rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
      >
        Ir a mi biblioteca
      </Link>
    </div>
  );
}