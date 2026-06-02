import { z } from "zod";

export const readingGoalSchema = z.object({
  targetBooks: z
    .string()
    .min(1, "La meta de libros es obligatoria.")
    .refine(
      (value) => Number(value) > 0,
      "La meta debe ser mayor a cero."
    )
    .refine(
      (value) => Number(value) <= 500,
      "La meta no debe superar 500 libros."
    ),
});

export type ReadingGoalFormValues = z.infer<typeof readingGoalSchema>;