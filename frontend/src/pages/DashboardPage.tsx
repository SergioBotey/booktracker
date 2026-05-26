import { useEffect, useState } from "react";
import { getDashboardSummary } from "../api/dashboardApi";
import { DashboardEmptyState } from "../features/dashboard/DashboardEmptyState";
import { DashboardMetricCard } from "../features/dashboard/DashboardMetricCard";
import { ReadingStatusSummary } from "../features/dashboard/ReadingStatusSummary";
import type { DashboardSummary } from "../types/dashboard";
import { getApiErrorMessage } from "../utils/getApiErrorMessage";

export function DashboardPage() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadDashboardSummary() {
    try {
      setError(null);
      setIsLoading(true);

      const data = await getDashboardSummary();

      setSummary(data);
    } catch (error) {
      setError(getApiErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadDashboardSummary();
  }, []);

  const hasBooks = Boolean(summary && summary.totalBooks > 0);

  const formattedPages = summary
    ? new Intl.NumberFormat("es-PE").format(summary.totalPagesRead)
    : "0";

  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>

        <p className="mt-2 text-slate-500">
          Revisa el avance general de tu biblioteca y tus hábitos de lectura.
        </p>
      </div>

      {error && (
        <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {isLoading && (
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-10 text-center text-sm text-slate-500">
          Cargando métricas...
        </div>
      )}

      {!isLoading && summary && !hasBooks && (
        <div className="mt-6">
          <DashboardEmptyState />
        </div>
      )}

      {!isLoading && summary && hasBooks && (
        <div className="mt-6 space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <DashboardMetricCard
              title="Total de libros"
              value={summary.totalBooks}
              description="Libros registrados en tu biblioteca."
            />

            <DashboardMetricCard
              title="Promedio de calificación"
              value={
                summary.averageRating > 0
                  ? summary.averageRating.toFixed(2)
                  : "Sin rating"
              }
              description="Promedio de libros calificados."
            />

            <DashboardMetricCard
              title="Páginas leídas"
              value={formattedPages}
              description="Suma de páginas de libros completados."
            />
          </div>

          <ReadingStatusSummary summary={summary} />

          <div className="grid gap-4 md:grid-cols-4">
            <DashboardMetricCard
              title="Pendientes"
              value={summary.pendingBooks}
            />

            <DashboardMetricCard
              title="Leyendo"
              value={summary.readingBooks}
            />

            <DashboardMetricCard
              title="Leídos"
              value={summary.completedBooks}
            />

            <DashboardMetricCard
              title="Abandonados"
              value={summary.abandonedBooks}
            />
          </div>
        </div>
      )}
    </div>
  );
}