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
    private readonly IValidator<UpdateBookRequest> _updateBookValidator;

    public BooksController(
        IBookService bookService,
        IValidator<CreateBookRequest> createBookValidator,
        IValidator<UpdateBookRequest> updateBookValidator)
    {
        _bookService = bookService;
        _createBookValidator = createBookValidator;
        _updateBookValidator = updateBookValidator;
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
            return BadRequest(
                ValidationResponseFactory.Create(validationResult, HttpContext)
            );
        }

        var userId = User.GetUserId();

        var response = await _bookService.CreateAsync(userId, request);

        return StatusCode(StatusCodes.Status201Created, response);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, UpdateBookRequest request)
    {
        var validationResult = await _updateBookValidator.ValidateAsync(request);

        if (!validationResult.IsValid)
        {
            return BadRequest(
                ValidationResponseFactory.Create(validationResult, HttpContext)
            );
        }

        var userId = User.GetUserId();

        var response = await _bookService.UpdateAsync(userId, id, request);

        return Ok(response);
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var userId = User.GetUserId();

        await _bookService.DeleteAsync(userId, id);

        return NoContent();
    }
}