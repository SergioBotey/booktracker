import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  BookRating,
  ReadingStatus,
  type Book,
  type CreateBookRequest,
} from "../../types/book";
import {
  createBookSchema,
  type CreateBookFormValues,
} from "./bookSchemas";

interface BookFormProps {
  initialBook?: Book | null;
  submitLabel?: string;
  onSubmit: (values: CreateBookRequest) => Promise<void>;
  isSubmitting?: boolean;
}

function toDateInputValue(value?: string | null): string {
  if (!value) {
    return "";
  }

  return value.slice(0, 10);
}

export function BookForm({
  initialBook,
  submitLabel = "Guardar libro",
  onSubmit,
  isSubmitting,
}: BookFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateBookFormValues>({
    resolver: zodResolver(createBookSchema),
    defaultValues: {
      title: "",
      author: "",
      genre: "",
      description: "",
      coverUrl: "",
      status: String(ReadingStatus.Pending),
      rating: "",
      pageCount: "",
      startDate: "",
      endDate: "",
      notes: "",
    },
  });

  useEffect(() => {
    if (!initialBook) {
      reset({
        title: "",
        author: "",
        genre: "",
        description: "",
        coverUrl: "",
        status: String(ReadingStatus.Pending),
        rating: "",
        pageCount: "",
        startDate: "",
        endDate: "",
        notes: "",
      });

      return;
    }

    reset({
      title: initialBook.title,
      author: initialBook.author,
      genre: initialBook.genre || "",
      description: initialBook.description || "",
      coverUrl: initialBook.coverUrl || "",
      status: String(initialBook.status),
      rating: initialBook.rating ? String(initialBook.rating) : "",
      pageCount: initialBook.pageCount ? String(initialBook.pageCount) : "",
      startDate: toDateInputValue(initialBook.startDate),
      endDate: toDateInputValue(initialBook.endDate),
      notes: initialBook.notes || "",
    });
  }, [initialBook, reset]);

  async function handleFormSubmit(values: CreateBookFormValues) {
    await onSubmit({
      title: values.title.trim(),
      author: values.author.trim(),
      genre: values.genre?.trim() || undefined,
      description: values.description?.trim() || undefined,
      coverUrl: values.coverUrl?.trim() || undefined,
      status: Number(values.status) as ReadingStatus,
      rating: values.rating ? (Number(values.rating) as BookRating) : null,
      pageCount: values.pageCount ? Number(values.pageCount) : null,
      startDate: values.startDate || null,
      endDate: values.endDate || null,
      notes: values.notes?.trim() || undefined,
    });

    if (!initialBook) {
      reset();
    }
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-slate-700">Título</label>
          <input
            className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-indigo-500"
            {...register("title")}
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">
              {errors.title.message}
            </p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">Autor</label>
          <input
            className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-indigo-500"
            {...register("author")}
          />
          {errors.author && (
            <p className="mt-1 text-sm text-red-600">
              {errors.author.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <label className="text-sm font-medium text-slate-700">Género</label>
          <input
            className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-indigo-500"
            {...register("genre")}
          />
          {errors.genre && (
            <p className="mt-1 text-sm text-red-600">
              {errors.genre.message}
            </p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">Estado</label>
          <select
            className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-indigo-500"
            {...register("status")}
          >
            <option value={String(ReadingStatus.Pending)}>Pendiente</option>
            <option value={String(ReadingStatus.Reading)}>Leyendo</option>
            <option value={String(ReadingStatus.Completed)}>Leído</option>
            <option value={String(ReadingStatus.Abandoned)}>Abandonado</option>
          </select>
          {errors.status && (
            <p className="mt-1 text-sm text-red-600">
              {errors.status.message}
            </p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">
            Calificación
          </label>
          <select
            className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-indigo-500"
            {...register("rating")}
          >
            <option value="">Sin calificación</option>
            <option value={String(BookRating.One)}>1 estrella</option>
            <option value={String(BookRating.Two)}>2 estrellas</option>
            <option value={String(BookRating.Three)}>3 estrellas</option>
            <option value={String(BookRating.Four)}>4 estrellas</option>
            <option value={String(BookRating.Five)}>5 estrellas</option>
          </select>
          {errors.rating && (
            <p className="mt-1 text-sm text-red-600">
              {errors.rating.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <label className="text-sm font-medium text-slate-700">Páginas</label>
          <input
            type="number"
            className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-indigo-500"
            {...register("pageCount")}
          />
          {errors.pageCount && (
            <p className="mt-1 text-sm text-red-600">
              {errors.pageCount.message}
            </p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">
            Fecha inicio
          </label>
          <input
            type="date"
            className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-indigo-500"
            {...register("startDate")}
          />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">
            Fecha fin
          </label>
          <input
            type="date"
            className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-indigo-500"
            {...register("endDate")}
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-slate-700">
          Descripción
        </label>
        <textarea
          rows={3}
          className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-indigo-500"
          {...register("description")}
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">
            {errors.description.message}
          </p>
        )}
      </div>

      <div>
        <label className="text-sm font-medium text-slate-700">Notas</label>
        <textarea
          rows={4}
          className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-indigo-500"
          {...register("notes")}
        />
        {errors.notes && (
          <p className="mt-1 text-sm text-red-600">
            {errors.notes.message}
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