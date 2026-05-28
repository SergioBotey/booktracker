using BookTracker.Application.DTOs.ReadingGoals;
using BookTracker.Application.Interfaces;
using BookTracker.Domain.Entities;

namespace BookTracker.Application.Services;

public class ReadingGoalService : IReadingGoalService
{
    private readonly IReadingGoalRepository _readingGoalRepository;

    public ReadingGoalService(IReadingGoalRepository readingGoalRepository)
    {
        _readingGoalRepository = readingGoalRepository;
    }

    public async Task<ReadingGoalResponse?> GetCurrentAsync(int userId)
    {
        var currentYear = DateTime.UtcNow.Year;

        var goal = await _readingGoalRepository.GetByUserIdAndYearAsync(
            userId,
            currentYear
        );

        if (goal is null)
        {
            return null;
        }

        return await MapToResponseAsync(goal, userId);
    }

    public async Task<ReadingGoalResponse> CreateAsync(
        int userId,
        CreateReadingGoalRequest request)
    {
        var existingGoal = await _readingGoalRepository.GetByUserIdAndYearAsync(
            userId,
            request.Year
        );

        if (existingGoal is not null)
        {
            throw new InvalidOperationException("Reading goal already exists for this year.");
        }

        var goal = new ReadingGoal
        {
            UserId = userId,
            Year = request.Year,
            TargetBooks = request.TargetBooks
        };

        await _readingGoalRepository.AddAsync(goal);
        await _readingGoalRepository.SaveChangesAsync();

        return await MapToResponseAsync(goal, userId);
    }

    public async Task<ReadingGoalResponse> UpdateAsync(
        int userId,
        int id,
        UpdateReadingGoalRequest request)
    {
        var goal = await _readingGoalRepository.GetTrackedByIdAndUserIdAsync(
            id,
            userId
        );

        if (goal is null)
        {
            throw new KeyNotFoundException("Reading goal not found.");
        }

        goal.TargetBooks = request.TargetBooks;
        goal.UpdatedAt = DateTime.UtcNow;

        await _readingGoalRepository.SaveChangesAsync();

        return await MapToResponseAsync(goal, userId);
    }

    private async Task<ReadingGoalResponse> MapToResponseAsync(
        ReadingGoal goal,
        int userId)
    {
        var completedBooks = await _readingGoalRepository
            .CountCompletedBooksByYearAsync(userId, goal.Year);

        var remainingBooks = Math.Max(goal.TargetBooks - completedBooks, 0);

        var progressPercentage = goal.TargetBooks == 0
            ? 0
            : (double)completedBooks / goal.TargetBooks * 100;

        return new ReadingGoalResponse
        {
            Id = goal.Id,
            Year = goal.Year,
            TargetBooks = goal.TargetBooks,
            CompletedBooks = completedBooks,
            RemainingBooks = remainingBooks,
            ProgressPercentage = Math.Round(progressPercentage, 2),
            CreatedAt = goal.CreatedAt,
            UpdatedAt = goal.UpdatedAt
        };
    }
}