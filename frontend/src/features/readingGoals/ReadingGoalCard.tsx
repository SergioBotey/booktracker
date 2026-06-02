import { useState } from "react";
import type { ReadingGoal } from "../../types/readingGoal";
import { ReadingGoalForm } from "./ReadingGoalForm";

interface ReadingGoalCardProps {
  goal: ReadingGoal | null;
  isSaving?: boolean;
  onCreate: (targetBooks: number) => Promise<void>;
  onUpdate: (targetBooks: number) => Promise<void>;
}

export function ReadingGoalCard({
  goal,
  isSaving,
  onCreate,
  onUpdate,
}: ReadingGoalCardProps) {
  const [isEditing, setIsEditing] = useState(false);

  const progress = Math.min(goal?.progressPercentage ?? 0, 100);

  if (!goal) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            Meta anual de lectura
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Define cuántos libros quieres leer este año.
          </p>
        </div>

        <div className="mt-5 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5">
          <p className="text-sm font-medium text-slate-700">
            Todavía no tienes una meta anual.
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Crea una meta para empezar a medir tu progreso.
          </p>

          <div className="mt-5">
            <ReadingGoalForm
              onSubmit={onCreate}
              isSubmitting={isSaving}
              submitLabel="Crear meta"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-start">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            Meta anual {goal.year}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Sigue tu avance de lectura durante el año.
          </p>
        </div>

        <button
          onClick={() => setIsEditing((value) => !value)}
          className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
        >
          {isEditing ? "Cancelar" : "Editar meta"}
        </button>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-sm text-slate-500">Meta</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">
            {goal.targetBooks}
          </p>
        </div>

        <div className="rounded-2xl bg-emerald-50 p-4">
          <p className="text-sm text-emerald-700">Completados</p>
          <p className="mt-1 text-2xl font-bold text-emerald-800">
            {goal.completedBooks}
          </p>
        </div>

        <div className="rounded-2xl bg-indigo-50 p-4">
          <p className="text-sm text-indigo-700">Faltantes</p>
          <p className="mt-1 text-2xl font-bold text-indigo-800">
            {goal.remainingBooks}
          </p>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-slate-700">Progreso</span>
          <span className="font-semibold text-slate-900">
            {goal.progressPercentage.toFixed(2)}%
          </span>
        </div>

        <div className="mt-2 h-3 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-indigo-600"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="mt-2 text-sm text-slate-500">
          Has leído {goal.completedBooks} de {goal.targetBooks} libros.
        </p>
      </div>

      {isEditing && (
        <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <ReadingGoalForm
            initialTargetBooks={goal.targetBooks}
            onSubmit={async (targetBooks) => {
              await onUpdate(targetBooks);
              setIsEditing(false);
            }}
            isSubmitting={isSaving}
            submitLabel="Actualizar meta"
          />
        </div>
      )}
    </div>
  );
}