using BookTracker.Domain.Enums;

namespace BookTracker.Application.DTOs.Books;

public class BookFilterRequest
{
    public string? Search { get; set; }

    public string? Genre { get; set; }

    public ReadingStatus? Status { get; set; }
}