using BookTracker.Application.Interfaces;
using BookTracker.Application.Services;
using FluentValidation;
using Microsoft.Extensions.DependencyInjection;

namespace BookTracker.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        services.AddValidatorsFromAssembly(typeof(DependencyInjection).Assembly);

        services.AddScoped<IAuthService, AuthService>();
        services.AddScoped<IBookService, BookService>();
        services.AddScoped<IDashboardService, DashboardService>();
        services.AddScoped<IReadingGoalService, ReadingGoalService>();

        return services;
    }
}