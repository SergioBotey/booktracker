using BookTracker.Application.DTOs.Books;
using BookTracker.Application.Interfaces;
using BookTracker.Domain.Entities;

namespace BookTracker.Application.Services;

public class BookService : IBookService
{
    private readonly IBookRepository _bookRepository;

    public BookService(IBookRepository bookRepository)
    {
        _bookRepository = bookRepository;
    }

    public async Task<BookResponse> CreateAsync(int userId, CreateBookRequest request)
    {
        var book = new Book
        {
            UserId = userId,
            Title = request.Title.Trim(),
            Author = request.Author.Trim(),
            Genre = request.Genre?.Trim(),
            Description = request.Description?.Trim(),
            CoverUrl = request.CoverUrl?.Trim(),
            Status = request.Status,
            Rating = request.Rating,
            PageCount = request.PageCount,
            StartDate = request.StartDate,
            EndDate = request.EndDate,
            Notes = request.Notes?.Trim()
        };

        await _bookRepository.AddAsync(book);
        await _bookRepository.SaveChangesAsync();

        return MapToResponse(book);
    }

    public async Task<IReadOnlyList<BookResponse>> GetAllAsync(
        int userId,
        BookFilterRequest filters)
    {
        var books = await _bookRepository.GetByUserIdAsync(userId, filters);

        return books
            .Select(MapToResponse)
            .ToList();
    }

    public async Task<BookResponse> GetByIdAsync(int userId, int bookId)
    {
        var book = await _bookRepository.GetByIdAndUserIdAsync(bookId, userId);

        if (book is null)
        {
            throw new KeyNotFoundException("Book not found.");
        }

        return MapToResponse(book);
    }

    public async Task<BookResponse> UpdateAsync(
        int userId,
        int bookId,
        UpdateBookRequest request)
    {
        var book = await _bookRepository.GetTrackedByIdAndUserIdAsync(bookId, userId);

        if (book is null)
        {
            throw new KeyNotFoundException("Book not found.");
        }

        book.Title = request.Title.Trim();
        book.Author = request.Author.Trim();
        book.Genre = request.Genre?.Trim();
        book.Description = request.Description?.Trim();
        book.CoverUrl = request.CoverUrl?.Trim();
        book.Status = request.Status;
        book.Rating = request.Rating;
        book.PageCount = request.PageCount;
        book.StartDate = request.StartDate;
        book.EndDate = request.EndDate;
        book.Notes = request.Notes?.Trim();
        book.UpdatedAt = DateTime.UtcNow;

        await _bookRepository.SaveChangesAsync();

        return MapToResponse(book);
    }

    public async Task DeleteAsync(int userId, int bookId)
    {
        var book = await _bookRepository.GetTrackedByIdAndUserIdAsync(bookId, userId);

        if (book is null)
        {
            throw new KeyNotFoundException("Book not found.");
        }

        _bookRepository.Delete(book);

        await _bookRepository.SaveChangesAsync();
    }

    private static BookResponse MapToResponse(Book book)
    {
        return new BookResponse
        {
            Id = book.Id,
            Title = book.Title,
            Author = book.Author,
            Genre = book.Genre,
            Description = book.Description,
            CoverUrl = book.CoverUrl,
            Status = book.Status,
            Rating = book.Rating,
            PageCount = book.PageCount,
            StartDate = book.StartDate,
            EndDate = book.EndDate,
            Notes = book.Notes,
            CreatedAt = book.CreatedAt,
            UpdatedAt = book.UpdatedAt
        };
    }
}