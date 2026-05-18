using BookTracker.Api.Extensions;
using BookTracker.Api.Shared;
using BookTracker.Application.DTOs.Books;
using BookTracker.Application.Interfaces;
using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BookTracker.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class BooksController : ControllerBase
{
    private readonly IBookService _bookService;
    private readonly IValidator<CreateBookRequest> _createBookValidator;

    public BooksController(
        IBookService bookService,
        IValidator<CreateBookRequest> createBookValidator)
    {
        _bookService = bookService;
        _createBookValidator = createBookValidator;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] BookFilterRequest filters)
    {
        var userId = User.GetUserId();

        var response = await _bookService.GetAllAsync(userId, filters);

        return Ok(response);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        var userId = User.GetUserId();

        var response = await _bookService.GetByIdAsync(userId, id);

        return Ok(response);
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateBookRequest request)
    {
        var validationResult = await _createBookValidator.ValidateAsync(request);

        if (!validationResult.IsValid)
        {
            var errors = validationResult.Errors
                .GroupBy(error => error.PropertyName)
                .ToDictionary(
                    group => group.Key,
                    group => group.Select(error => error.ErrorMessage).ToArray()
                );

            return BadRequest(new ApiValidationErrorResponse
            {
                StatusCode = StatusCodes.Status400BadRequest,
                Message = "Validation failed.",
                Errors = errors,
                TraceId = HttpContext.TraceIdentifier
            });
        }

        var userId = User.GetUserId();

        var response = await _bookService.CreateAsync(userId, request);

        return StatusCode(StatusCodes.Status201Created, response);
    }
}