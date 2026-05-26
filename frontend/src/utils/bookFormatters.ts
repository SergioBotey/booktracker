import { BookRating, ReadingStatus } from "../types/book";

export function getReadingStatusLabel(status: ReadingStatus): string {
  const labels: Record<ReadingStatus, string> = {
    [ReadingStatus.Pending]: "Pendiente",
    [ReadingStatus.Reading]: "Leyendo",
    [ReadingStatus.Completed]: "Leído",
    [ReadingStatus.Abandoned]: "Abandonado",
  };

  return labels[status] ?? "Desconocido";
}

export function getReadingStatusClass(status: ReadingStatus): string {
  const classes: Record<ReadingStatus, string> = {
    [ReadingStatus.Pending]: "bg-slate-100 text-slate-700",
    [ReadingStatus.Reading]: "bg-blue-50 text-blue-700",
    [ReadingStatus.Completed]: "bg-emerald-50 text-emerald-700",
    [ReadingStatus.Abandoned]: "bg-red-50 text-red-700",
  };

  return classes[status] ?? "bg-slate-100 text-slate-700";
}

export function getRatingStars(rating?: BookRating | null): string {
  if (!rating) {
    return "Sin calificación";
  }

  return "★".repeat(rating) + "☆".repeat(5 - rating);
}

export function formatDate(value?: string | null): string {
  if (!value) {
    return "No definido";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "No definido";
  }

  return new Intl.DateTimeFormat("es-PE", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(date);
}

export function formatPageCount(pageCount?: number | null): string {
  if (!pageCount) {
    return "Sin páginas";
  }

  return `${pageCount} páginas`;
}