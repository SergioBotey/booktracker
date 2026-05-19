using BookTracker.Application.DTOs.Books;
using BookTracker.Domain.Enums;
using FluentValidation;

namespace BookTracker.Application.Validators.Books;

public class UpdateBookRequestValidator : AbstractValidator<UpdateBookRequest>
{
    public UpdateBookRequestValidator()
    {
        RuleFor(x => x.Title)
            .NotEmpty()
            .WithMessage("Title is required.")
            .MaximumLength(250)
            .WithMessage("Title must not exceed 250 characters.");

        RuleFor(x => x.Author)
            .NotEmpty()
            .WithMessage("Author is required.")
            .MaximumLength(180)
            .WithMessage("Author must not exceed 180 characters.");

        RuleFor(x => x.Genre)
            .MaximumLength(100)
            .WithMessage("Genre must not exceed 100 characters.");

        RuleFor(x => x.Description)
            .MaximumLength(2000)
            .WithMessage("Description must not exceed 2000 characters.");

        RuleFor(x => x.CoverUrl)
            .MaximumLength(1000)
            .WithMessage("Cover URL must not exceed 1000 characters.");

        RuleFor(x => x.Notes)
            .MaximumLength(4000)
            .WithMessage("Notes must not exceed 4000 characters.");

        RuleFor(x => x.PageCount)
            .GreaterThan(0)
            .When(x => x.PageCount.HasValue)
            .WithMessage("Page count must be greater than zero.");

        RuleFor(x => x.Rating)
            .Must(rating => rating is null || Enum.IsDefined(typeof(BookRating), rating))
            .WithMessage("Rating is invalid.");

        RuleFor(x => x.Status)
            .Must(status => Enum.IsDefined(typeof(ReadingStatus), status))
            .WithMessage("Reading status is invalid.");

        RuleFor(x => x.EndDate)
            .GreaterThanOrEqualTo(x => x.StartDate)
            .When(x => x.StartDate.HasValue && x.EndDate.HasValue)
            .WithMessage("End date must be greater than or equal to start date.");
    }
}