namespace BookTracker.Application.DTOs.Dashboard;

public class DashboardSummaryResponse
{
    public int TotalBooks { get; set; }

    public int PendingBooks { get; set; }

    public int ReadingBooks { get; set; }

    public int CompletedBooks { get; set; }

    public int AbandonedBooks { get; set; }

    public double AverageRating { get; set; }

    public int TotalPagesRead { get; set; }
}