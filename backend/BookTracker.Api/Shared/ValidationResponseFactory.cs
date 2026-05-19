using FluentValidation.Results;

namespace BookTracker.Api.Shared;

public static class ValidationResponseFactory
{
    public static ApiValidationErrorResponse Create(
        ValidationResult validationResult,
        HttpContext httpContext)
    {
        var errors = validationResult.Errors
            .GroupBy(error => error.PropertyName)
            .ToDictionary(
                group => group.Key,
                group => group.Select(error => error.ErrorMessage).ToArray()
            );

        return new ApiValidationErrorResponse
        {
            StatusCode = StatusCodes.Status400BadRequest,
            Message = "Validation failed.",
            Errors = errors,
            TraceId = httpContext.TraceIdentifier
        };
    }
}