namespace BookTracker.Application.DTOs.ReadingGoals;

public class CreateReadingGoalRequest
{
    public int Year { get; set; }

    public int TargetBooks { get; set; }
}