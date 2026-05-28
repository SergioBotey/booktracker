using BookTracker.Domain.Enums;

namespace BookTracker.Application.DTOs.Dashboard;

public class RecentBookResponse
{
    public int Id { get; set; }

    public string Title { get; set; } = string.Empty;

    public string Author { get; set; } = string.Empty;

    public string? Genre { get; set; }

    public ReadingStatus Status { get; set; }

    public BookRating? Rating { get; set; }

    public DateTime CreatedAt { get; set; }
}