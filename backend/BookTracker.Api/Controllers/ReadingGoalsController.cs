using BookTracker.Api.Extensions;
using BookTracker.Api.Shared;
using BookTracker.Application.DTOs.ReadingGoals;
using BookTracker.Application.Interfaces;
using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BookTracker.Api.Controllers;

[ApiController]
[Route("api/reading-goals")]
[Authorize]
public class ReadingGoalsController : ControllerBase
{
    private readonly IReadingGoalService _readingGoalService;
    private readonly IValidator<CreateReadingGoalRequest> _createValidator;
    private readonly IValidator<UpdateReadingGoalRequest> _updateValidator;

    public ReadingGoalsController(
        IReadingGoalService readingGoalService,
        IValidator<CreateReadingGoalRequest> createValidator,
        IValidator<UpdateReadingGoalRequest> updateValidator)
    {
        _readingGoalService = readingGoalService;
        _createValidator = createValidator;
        _updateValidator = updateValidator;
    }

    [HttpGet("current")]
    public async Task<IActionResult> GetCurrent()
    {
        var userId = User.GetUserId();

        var response = await _readingGoalService.GetCurrentAsync(userId);

        if (response is null)
        {
            return NotFound(new
            {
                statusCode = StatusCodes.Status404NotFound,
                message = "Current reading goal not found.",
                traceId = HttpContext.TraceIdentifier
            });
        }

        return Ok(response);
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateReadingGoalRequest request)
    {
        var validationResult = await _createValidator.ValidateAsync(request);

        if (!validationResult.IsValid)
        {
            return BadRequest(
                ValidationResponseFactory.Create(validationResult, HttpContext)
            );
        }

        var userId = User.GetUserId();

        var response = await _readingGoalService.CreateAsync(userId, request);

        return StatusCode(StatusCodes.Status201Created, response);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(
        int id,
        UpdateReadingGoalRequest request)
    {
        var validationResult = await _updateValidator.ValidateAsync(request);

        if (!validationResult.IsValid)
        {
            return BadRequest(
                ValidationResponseFactory.Create(validationResult, HttpContext)
            );
        }

        var userId = User.GetUserId();

        var response = await _readingGoalService.UpdateAsync(userId, id, request);

        return Ok(response);
    }
}