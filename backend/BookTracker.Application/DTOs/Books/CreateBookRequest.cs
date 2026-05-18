using BookTracker.Domain.Enums;

namespace BookTracker.Application.DTOs.Books;

public class CreateBookRequest
{
    public string Title { get; set; } = string.Empty;

    public string Author { get; set; } = string.Empty;

    public string? Genre { get; set; }

    public string? Description { get; set; }

    public string? CoverUrl { get; set; }

    public ReadingStatus Status { get; set; } = ReadingStatus.Pending;

    public BookRating? Rating { get; set; }

    public int? PageCount { get; set; }

    public DateTime? StartDate { get; set; }

    public DateTime? EndDate { get; set; }

    public string? Notes { get; set; }
}