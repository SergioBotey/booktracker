using BookTracker.Application.DTOs.Dashboard;
using BookTracker.Application.Interfaces;
using BookTracker.Domain.Enums;
using BookTracker.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace BookTracker.Infrastructure.Repositories;

public class DashboardRepository : IDashboardRepository
{
    private readonly BookTrackerDbContext _context;

    public DashboardRepository(BookTrackerDbContext context)
    {
        _context = context;
    }

    public async Task<DashboardSummaryResponse> GetSummaryAsync(int userId)
    {
        var userBooks = _context.Books
            .AsNoTracking()
            .Where(book => book.UserId == userId);

        var totalBooks = await userBooks.CountAsync();

        var pendingBooks = await userBooks
            .CountAsync(book => book.Status == ReadingStatus.Pending);

        var readingBooks = await userBooks
            .CountAsync(book => book.Status == ReadingStatus.Reading);

        var completedBooks = await userBooks
            .CountAsync(book => book.Status == ReadingStatus.Completed);

        var abandonedBooks = await userBooks
            .CountAsync(book => book.Status == ReadingStatus.Abandoned);

        var ratedBooks = userBooks
            .Where(book => book.Rating.HasValue);

        var averageRating = await ratedBooks.AnyAsync()
            ? await ratedBooks.AverageAsync(book => (double)book.Rating!.Value)
            : 0;

        var totalPagesRead = await userBooks
            .Where(book =>
                book.Status == ReadingStatus.Completed &&
                book.PageCount.HasValue)
            .SumAsync(book => book.PageCount!.Value);

        return new DashboardSummaryResponse
        {
            TotalBooks = totalBooks,
            PendingBooks = pendingBooks,
            ReadingBooks = readingBooks,
            CompletedBooks = completedBooks,
            AbandonedBooks = abandonedBooks,
            AverageRating = Math.Round(averageRating, 2),
            TotalPagesRead = totalPagesRead
        };
    }
}