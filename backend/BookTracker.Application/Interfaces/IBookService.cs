using BookTracker.Application.DTOs.Books;

namespace BookTracker.Application.Interfaces;

public interface IBookService
{
    Task<BookResponse> CreateAsync(int userId, CreateBookRequest request);

    Task<IReadOnlyList<BookResponse>> GetAllAsync(
        int userId,
        BookFilterRequest filters
    );

    Task<BookResponse> GetByIdAsync(int userId, int bookId);
}