using BookTracker.Application.DTOs.Dashboard;

namespace BookTracker.Application.Interfaces;

public interface IDashboardService
{
    Task<DashboardSummaryResponse> GetSummaryAsync(int userId);
}