using BookTracker.Domain.Entities;

namespace BookTracker.Application.Interfaces;

public interface IReadingGoalRepository
{
    Task<ReadingGoal?> GetByUserIdAndYearAsync(int userId, int year);

    Task<ReadingGoal?> GetTrackedByIdAndUserIdAsync(int id, int userId);

    Task AddAsync(ReadingGoal readingGoal);

    Task<int> CountCompletedBooksByYearAsync(int userId, int year);

    Task SaveChangesAsync();
}