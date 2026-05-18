using BookTracker.Application.DTOs.Books;
using BookTracker.Application.Interfaces;
using BookTracker.Domain.Entities;
using BookTracker.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace BookTracker.Infrastructure.Repositories;

public class BookRepository : IBookRepository
{
    private readonly BookTrackerDbContext _context;

    public BookRepository(BookTrackerDbContext context)
    {
        _context = context;
    }

    public async Task AddAsync(Book book)
    {
        await _context.Books.AddAsync(book);
    }

    public async Task<IReadOnlyList<Book>> GetByUserIdAsync(
        int userId,
        BookFilterRequest filters)
    {
        var query = _context.Books
            .AsNoTracking()
            .Where(book => book.UserId == userId);

        if (!string.IsNullOrWhiteSpace(filters.Search))
        {
            var search = filters.Search.Trim().ToLower();

            query = query.Where(book =>
                book.Title.ToLower().Contains(search) ||
                book.Author.ToLower().Contains(search)
            );
        }

        if (!string.IsNullOrWhiteSpace(filters.Genre))
        {
            var genre = filters.Genre.Trim().ToLower();

            query = query.Where(book =>
                book.Genre != null &&
                book.Genre.ToLower() == genre
            );
        }

        if (filters.Status.HasValue)
        {
            query = query.Where(book => book.Status == filters.Status.Value);
        }

        return await query
            .OrderByDescending(book => book.CreatedAt)
            .ToListAsync();
    }

    public async Task<Book?> GetByIdAndUserIdAsync(int bookId, int userId)
    {
        return await _context.Books
            .AsNoTracking()
            .FirstOrDefaultAsync(book =>
                book.Id == bookId &&
                book.UserId == userId
            );
    }

    public async Task SaveChangesAsync()
    {
        await _context.SaveChangesAsync();
    }
}