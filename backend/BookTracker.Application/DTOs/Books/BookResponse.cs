using BookTracker.Domain.Enums;

namespace BookTracker.Application.DTOs.Books;

public class BookResponse
{
    public int Id { get; set; }

    public string Title { get; set; } = string.Empty;

    public string Author { get; set; } = string.Empty;

    public string? Genre { get; set; }

    public string? Description { get; set; }

    public string? CoverUrl { get; set; }

    public ReadingStatus Status { get; set; }

    public BookRating? Rating { get; set; }

    public int? PageCount { get; set; }

    public DateTime? StartDate { get; set; }

    public DateTime? EndDate { get; set; }

    public string? Notes { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }
}