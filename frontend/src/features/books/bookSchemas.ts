import { z } from "zod";
import { BookRating, ReadingStatus } from "../../types/book";

const validReadingStatuses = Object.values(ReadingStatus)
  .filter((value) => typeof value === "number")
  .map(String);

const validBookRatings = Object.values(BookRating)
  .filter((value) => typeof value === "number")
  .map(String);

export const createBookSchema = z.object({
  title: z
    .string()
    .min(1, "El título es obligatorio.")
    .max(250, "El título no debe superar 250 caracteres."),

  author: z
    .string()
    .min(1, "El autor es obligatorio.")
    .max(180, "El autor no debe superar 180 caracteres."),

  genre: z
    .string()
    .max(100, "El género no debe superar 100 caracteres.")
    .optional(),

  description: z
    .string()
    .max(2000, "La descripción no debe superar 2000 caracteres.")
    .optional(),

  coverUrl: z
    .string()
    .max(1000, "La URL no debe superar 1000 caracteres.")
    .optional(),

  status: z
    .string()
    .min(1, "El estado es obligatorio.")
    .refine(
      (value) => validReadingStatuses.includes(value),
      "El estado de lectura es inválido."
    ),

  rating: z
    .string()
    .optional()
    .refine(
      (value) => !value || validBookRatings.includes(value),
      "La calificación es inválida."
    ),

  pageCount: z
    .string()
    .optional()
    .refine(
      (value) => !value || Number(value) > 0,
      "El número de páginas debe ser mayor a cero."
    ),

  startDate: z.string().optional(),

  endDate: z.string().optional(),

  notes: z
    .string()
    .max(4000, "Las notas no deben superar 4000 caracteres.")
    .optional(),
});

export type CreateBookFormValues = z.infer<typeof createBookSchema>;