interface DashboardMetricCardProps {
  title: string;
  value: string | number;
  description?: string;
}

export function DashboardMetricCard({
  title,
  value,
  description,
}: DashboardMetricCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-slate-500">{title}</p>

      <p className="mt-2 text-3xl font-bold text-slate-900">{value}</p>

      {description && (
        <p className="mt-2 text-sm text-slate-400">{description}</p>
      )}
    </div>
  );
}