namespace BookTracker.Api.Shared;

public class ApiValidationErrorResponse
{
    public int StatusCode { get; set; }

    public string Message { get; set; } = "Validation failed.";

    public Dictionary<string, string[]> Errors { get; set; } = new();

    public string TraceId { get; set; } = string.Empty;
}