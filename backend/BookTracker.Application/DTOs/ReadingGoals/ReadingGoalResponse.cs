namespace BookTracker.Application.DTOs.ReadingGoals;

public class ReadingGoalResponse
{
    public int Id { get; set; }

    public int Year { get; set; }

    public int TargetBooks { get; set; }

    public int CompletedBooks { get; set; }

    public int RemainingBooks { get; set; }

    public double ProgressPercentage { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }
}