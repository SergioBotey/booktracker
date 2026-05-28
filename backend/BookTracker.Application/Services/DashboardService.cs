using BookTracker.Application.DTOs.Dashboard;
using BookTracker.Application.Interfaces;

namespace BookTracker.Application.Services;

public class DashboardService : IDashboardService
{
    private const int DefaultRecentBooksLimit = 5;
    private const int MaxRecentBooksLimit = 10;

    private readonly IDashboardRepository _dashboardRepository;

    public DashboardService(IDashboardRepository dashboardRepository)
    {
        _dashboardRepository = dashboardRepository;
    }

    public async Task<DashboardSummaryResponse> GetSummaryAsync(int userId)
    {
        return await _dashboardRepository.GetSummaryAsync(userId);
    }

    public async Task<IReadOnlyList<RecentBookResponse>> GetRecentBooksAsync(
        int userId,
        int limit)
    {
        var safeLimit = limit <= 0
            ? DefaultRecentBooksLimit
            : Math.Min(limit, MaxRecentBooksLimit);

        return await _dashboardRepository.GetRecentBooksAsync(userId, safeLimit);
    }
}