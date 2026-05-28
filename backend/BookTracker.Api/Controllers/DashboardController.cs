using BookTracker.Api.Extensions;
using BookTracker.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BookTracker.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class DashboardController : ControllerBase
{
    private readonly IDashboardService _dashboardService;

    public DashboardController(IDashboardService dashboardService)
    {
        _dashboardService = dashboardService;
    }

    [HttpGet("summary")]
    public async Task<IActionResult> GetSummary()
    {
        var userId = User.GetUserId();

        var response = await _dashboardService.GetSummaryAsync(userId);

        return Ok(response);
    }

    [HttpGet("recent-books")]
    public async Task<IActionResult> GetRecentBooks([FromQuery] int limit = 5)
    {
        var userId = User.GetUserId();

        var response = await _dashboardService.GetRecentBooksAsync(userId, limit);

        return Ok(response);
    }
}