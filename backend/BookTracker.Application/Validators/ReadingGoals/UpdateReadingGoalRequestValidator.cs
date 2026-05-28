using BookTracker.Application.DTOs.ReadingGoals;
using FluentValidation;

namespace BookTracker.Application.Validators.ReadingGoals;

public class UpdateReadingGoalRequestValidator : AbstractValidator<UpdateReadingGoalRequest>
{
    public UpdateReadingGoalRequestValidator()
    {
        RuleFor(x => x.TargetBooks)
            .GreaterThan(0)
            .WithMessage("Target books must be greater than zero.")
            .LessThanOrEqualTo(500)
            .WithMessage("Target books must not exceed 500.");
    }
}