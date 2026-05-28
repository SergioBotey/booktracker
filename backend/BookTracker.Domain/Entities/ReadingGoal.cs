using BookTracker.Domain.Common;

namespace BookTracker.Domain.Entities;

public class ReadingGoal : AuditableEntity
{
    public int UserId { get; set; }

    public int Year { get; set; }

    public int TargetBooks { get; set; }

    public User User { get; set; } = null!;
}