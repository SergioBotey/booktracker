import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  readingGoalSchema,
  type ReadingGoalFormValues,
} from "./readingGoalSchemas";

interface ReadingGoalFormProps {
  initialTargetBooks?: number;
  submitLabel?: string;
  isSubmitting?: boolean;
  onSubmit: (targetBooks: number) => Promise<void>;
}

export function ReadingGoalForm({
  initialTargetBooks,
  submitLabel = "Guardar meta",
  isSubmitting,
  onSubmit,
}: ReadingGoalFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ReadingGoalFormValues>({
    resolver: zodResolver(readingGoalSchema),
    defaultValues: {
      targetBooks: initialTargetBooks ? String(initialTargetBooks) : "",
    },
  });

  useEffect(() => {
    reset({
      targetBooks: initialTargetBooks ? String(initialTargetBooks) : "",
    });
  }, [initialTargetBooks, reset]);

  async function handleFormSubmit(values: ReadingGoalFormValues) {
    await onSubmit(Number(values.targetBooks));
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div>
        <label className="text-sm font-medium text-slate-700">
          Meta anual de libros
        </label>

        <input
          type="number"
          min={1}
          max={500}
          placeholder="Ej. 24"
          className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-indigo-500"
          {...register("targetBooks")}
        />

        {errors.targetBooks && (
          <p className="mt-1 text-sm text-red-600">
            {errors.targetBooks.message}
          </p>
        )}
      </div>

      <button
        disabled={isSubmitting}
        className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Guardando..." : submitLabel}
      </button>
    </form>
  );
}