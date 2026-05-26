using BookTracker.Application.DTOs.Dashboard;

namespace BookTracker.Application.Interfaces;

public interface IDashboardRepository
{
    Task<DashboardSummaryResponse> GetSummaryAsync(int userId);
}