using BookTracker.Application.DTOs.ReadingGoals;

namespace BookTracker.Application.Interfaces;

public interface IReadingGoalService
{
    Task<ReadingGoalResponse?> GetCurrentAsync(int userId);

    Task<ReadingGoalResponse> CreateAsync(
        int userId,
        CreateReadingGoalRequest request
    );

    Task<ReadingGoalResponse> UpdateAsync(
        int userId,
        int id,
        UpdateReadingGoalRequest request
    );
}