using BookTracker.Application.DTOs.Books;
using BookTracker.Domain.Entities;

namespace BookTracker.Application.Interfaces;

public interface IBookRepository
{
    Task AddAsync(Book book);

    Task<IReadOnlyList<Book>> GetByUserIdAsync(
        int userId,
        BookFilterRequest filters
    );

    Task<Book?> GetByIdAndUserIdAsync(int bookId, int userId);

    Task<Book?> GetTrackedByIdAndUserIdAsync(int bookId, int userId);

    void Delete(Book book);

    Task SaveChangesAsync();
}