using BookTracker.Application.DTOs.Dashboard;
using BookTracker.Application.Interfaces;

namespace BookTracker.Application.Services;

public class DashboardService : IDashboardService
{
    private readonly IDashboardRepository _dashboardRepository;

    public DashboardService(IDashboardRepository dashboardRepository)
    {
        _dashboardRepository = dashboardRepository;
    }

    public async Task<DashboardSummaryResponse> GetSummaryAsync(int userId)
    {
        return await _dashboardRepository.GetSummaryAsync(userId);
    }
}