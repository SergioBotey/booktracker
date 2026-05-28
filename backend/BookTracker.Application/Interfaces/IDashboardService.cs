using BookTracker.Application.DTOs.Dashboard;

namespace BookTracker.Application.Interfaces;

public interface IDashboardService
{
    Task<DashboardSummaryResponse> GetSummaryAsync(int userId);

    Task<IReadOnlyList<RecentBookResponse>> GetRecentBooksAsync(
        int userId,
        int limit
    );
}