import type { DashboardSummary } from "../../types/dashboard";

interface ReadingStatusSummaryProps {
  summary: DashboardSummary;
}

export function ReadingStatusSummary({ summary }: ReadingStatusSummaryProps) {
  const items = [
    {
      label: "Pendientes",
      value: summary.pendingBooks,
      className: "bg-slate-100 text-slate-700",
    },
    {
      label: "Leyendo",
      value: summary.readingBooks,
      className: "bg-blue-50 text-blue-700",
    },
    {
      label: "Leídos",
      value: summary.completedBooks,
      className: "bg-emerald-50 text-emerald-700",
    },
    {
      label: "Abandonados",
      value: summary.abandonedBooks,
      className: "bg-red-50 text-red-700",
    },
  ];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-bold text-slate-900">
        Estado de tus lecturas
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        Distribución actual de tu biblioteca personal.
      </p>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <div
            key={item.label}
            className={[
              "rounded-2xl px-4 py-3",
              item.className,
            ].join(" ")}
          >
            <p className="text-sm font-medium">{item.label}</p>
            <p className="mt-1 text-2xl font-bold">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}