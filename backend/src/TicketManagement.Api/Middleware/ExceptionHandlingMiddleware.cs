using Microsoft.AspNetCore.Mvc;
using TicketManagement.Api.Exceptions;

namespace TicketManagement.Api.Middleware;

public class ExceptionHandlingMiddleware
{
    private const string UnexpectedErrorTitle = "An unexpected error occurred";
    private const string UnauthorizedTitle = "Unauthorized";

    private readonly RequestDelegate _next;
    private readonly ILogger<ExceptionHandlingMiddleware> _logger;

    public ExceptionHandlingMiddleware(RequestDelegate next, ILogger<ExceptionHandlingMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context, IProblemDetailsService problemDetailsService)
    {
        try
        {
            await _next(context);
        }
        catch (Exception exception) when (!context.Response.HasStarted)
        {
            var problemDetails = CreateProblemDetails(exception);

            if (problemDetails.Status == StatusCodes.Status500InternalServerError)
            {
                _logger.LogError(exception, "Unhandled exception for {Method} {Path}", context.Request.Method, context.Request.Path);
            }

            context.Response.StatusCode = problemDetails.Status ?? StatusCodes.Status500InternalServerError;

            await problemDetailsService.WriteAsync(new ProblemDetailsContext
            {
                HttpContext = context,
                ProblemDetails = problemDetails,
                Exception = exception
            });
        }
    }

    private static ProblemDetails CreateProblemDetails(Exception exception) => exception switch
    {
        AppException appException => new ProblemDetails
        {
            Status = appException.StatusCode,
            Title = appException.Title,
            Detail = appException.Message
        },
        UnauthorizedAccessException => new ProblemDetails
        {
            Status = StatusCodes.Status401Unauthorized,
            Title = UnauthorizedTitle
        },
        _ => new ProblemDetails
        {
            Status = StatusCodes.Status500InternalServerError,
            Title = UnexpectedErrorTitle
        }
    };
}
