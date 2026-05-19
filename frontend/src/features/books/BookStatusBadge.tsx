import type { ReadingStatus } from "../../types/book";
import {
  getReadingStatusClass,
  getReadingStatusLabel,
} from "../../utils/bookFormatters";

interface BookStatusBadgeProps {
  status: ReadingStatus;
}

export function BookStatusBadge({ status }: BookStatusBadgeProps) {
  return (
    <span
      className={[
        "inline-flex rounded-full px-3 py-1 text-xs font-semibold",
        getReadingStatusClass(status),
      ].join(" ")}
    >
      {getReadingStatusLabel(status)}
    </span>
  );
}