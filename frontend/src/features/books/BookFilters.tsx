import { ReadingStatus, type BookFilterRequest } from "../../types/book";

interface BookFiltersProps {
  filters: BookFilterRequest;
  onChange: (filters: BookFilterRequest) => void;
  onSearch: () => void;
  onClear: () => void;
  isLoading?: boolean;
}

export function BookFilters({
  filters,
  onChange,
  onSearch,
  onClear,
  isLoading,
}: BookFiltersProps) {
  return (
    <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="grid gap-4 md:grid-cols-4">
        <div className="md:col-span-2">
          <label className="text-sm font-medium text-slate-700">
            Buscar
          </label>
          <input
            value={filters.search || ""}
            onChange={(event) =>
              onChange({
                ...filters,
                search: event.target.value,
              })
            }
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                onSearch();
              }
            }}
            placeholder="Buscar por título o autor"
            className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">
            Género
          </label>
          <input
            value={filters.genre || ""}
            onChange={(event) =>
              onChange({
                ...filters,
                genre: event.target.value,
              })
            }
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                onSearch();
              }
            }}
            placeholder="Ej. Software Engineering"
            className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">
            Estado
          </label>
          <select
            value={filters.status || ""}
            onChange={(event) =>
              onChange({
                ...filters,
                status: event.target.value
                  ? (Number(event.target.value) as ReadingStatus)
                  : "",
              })
            }
            className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-indigo-500"
          >
            <option value="">Todos</option>
            <option value={ReadingStatus.Pending}>Pendiente</option>
            <option value={ReadingStatus.Reading}>Leyendo</option>
            <option value={ReadingStatus.Completed}>Leído</option>
            <option value={ReadingStatus.Abandoned}>Abandonado</option>
          </select>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:justify-end">
        <button
          onClick={onClear}
          disabled={isLoading}
          className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 disabled:opacity-60"
        >
          Limpiar filtros
        </button>

        <button
          onClick={onSearch}
          disabled={isLoading}
          className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60"
        >
          {isLoading ? "Buscando..." : "Buscar"}
        </button>
      </div>
    </section>
  );
}