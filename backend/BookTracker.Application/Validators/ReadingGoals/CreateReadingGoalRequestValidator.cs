using BookTracker.Application.DTOs.ReadingGoals;
using FluentValidation;

namespace BookTracker.Application.Validators.ReadingGoals;

public class CreateReadingGoalRequestValidator : AbstractValidator<CreateReadingGoalRequest>
{
    public CreateReadingGoalRequestValidator()
    {
        RuleFor(x => x.Year)
            .InclusiveBetween(2000, 2100)
            .WithMessage("Year must be between 2000 and 2100.");

        RuleFor(x => x.TargetBooks)
            .GreaterThan(0)
            .WithMessage("Target books must be greater than zero.")
            .LessThanOrEqualTo(500)
            .WithMessage("Target books must not exceed 500.");
    }
}