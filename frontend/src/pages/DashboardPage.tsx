import { useEffect, useState } from "react";
import {
  getDashboardSummary,
  getRecentBooks,
} from "../api/dashboardApi";
import {
  createReadingGoal,
  getCurrentReadingGoal,
  updateReadingGoal,
} from "../api/readingGoalsApi";
import { DashboardEmptyState } from "../features/dashboard/DashboardEmptyState";
import { DashboardMetricCard } from "../features/dashboard/DashboardMetricCard";
import { ReadingStatusSummary } from "../features/dashboard/ReadingStatusSummary";
import { RecentBooksCard } from "../features/dashboard/RecentBooksCard";
import { ReadingGoalCard } from "../features/readingGoals/ReadingGoalCard";
import type {
  DashboardSummary,
  RecentBook,
} from "../types/dashboard";
import type { ReadingGoal } from "../types/readingGoal";
import { getApiErrorMessage } from "../utils/getApiErrorMessage";

export function DashboardPage() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [recentBooks, setRecentBooks] = useState<RecentBook[]>([]);
  const [readingGoal, setReadingGoal] = useState<ReadingGoal | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSavingGoal, setIsSavingGoal] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function loadDashboard() {
    try {
      setError(null);
      setIsLoading(true);

      const [summaryData, recentBooksData, readingGoalData] = await Promise.all([
        getDashboardSummary(),
        getRecentBooks(5),
        getCurrentReadingGoal(),
      ]);

      setSummary(summaryData);
      setRecentBooks(recentBooksData);
      setReadingGoal(readingGoalData);
    } catch (error) {
      setError(getApiErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }

  async function handleCreateReadingGoal(targetBooks: number) {
    try {
      setError(null);
      setIsSavingGoal(true);

      const currentYear = new Date().getFullYear();

      const createdGoal = await createReadingGoal({
        year: currentYear,
        targetBooks,
      });

      setReadingGoal(createdGoal);
    } catch (error) {
      setError(getApiErrorMessage(error));
    } finally {
      setIsSavingGoal(false);
    }
  }

  async function handleUpdateReadingGoal(targetBooks: number) {
    if (!readingGoal) {
      return;
    }

    try {
      setError(null);
      setIsSavingGoal(true);

      const updatedGoal = await updateReadingGoal(readingGoal.id, {
        targetBooks,
      });

      setReadingGoal(updatedGoal);
    } catch (error) {
      setError(getApiErrorMessage(error));
    } finally {
      setIsSavingGoal(false);
    }
  }

  useEffect(() => {
    loadDashboard();
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
        <div className="mt-6 space-y-6">
          <ReadingGoalCard
            goal={readingGoal}
            isSaving={isSavingGoal}
            onCreate={handleCreateReadingGoal}
            onUpdate={handleUpdateReadingGoal}
          />

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

          <ReadingGoalCard
            goal={readingGoal}
            isSaving={isSavingGoal}
            onCreate={handleCreateReadingGoal}
            onUpdate={handleUpdateReadingGoal}
          />

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

          <RecentBooksCard books={recentBooks} />
        </div>
      )}
    </div>
  );
}