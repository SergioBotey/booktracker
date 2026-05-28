using BookTracker.Application.Interfaces;
using BookTracker.Domain.Entities;
using BookTracker.Domain.Enums;
using BookTracker.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace BookTracker.Infrastructure.Repositories;

public class ReadingGoalRepository : IReadingGoalRepository
{
    private readonly BookTrackerDbContext _context;

    public ReadingGoalRepository(BookTrackerDbContext context)
    {
        _context = context;
    }

    public async Task<ReadingGoal?> GetByUserIdAndYearAsync(int userId, int year)
    {
        return await _context.ReadingGoals
            .AsNoTracking()
            .FirstOrDefaultAsync(goal =>
                goal.UserId == userId &&
                goal.Year == year
            );
    }

    public async Task<ReadingGoal?> GetTrackedByIdAndUserIdAsync(int id, int userId)
    {
        return await _context.ReadingGoals
            .FirstOrDefaultAsync(goal =>
                goal.Id == id &&
                goal.UserId == userId
            );
    }

    public async Task AddAsync(ReadingGoal readingGoal)
    {
        await _context.ReadingGoals.AddAsync(readingGoal);
    }

    public async Task<int> CountCompletedBooksByYearAsync(int userId, int year)
    {
        return await _context.Books
            .AsNoTracking()
            .CountAsync(book =>
                book.UserId == userId &&
                book.Status == ReadingStatus.Completed &&
                book.EndDate.HasValue &&
                book.EndDate.Value.Year == year
            );
    }

    public async Task SaveChangesAsync()
    {
        await _context.SaveChangesAsync();
    }
}