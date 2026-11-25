using Microsoft.OpenApi;

namespace TicketManagement.Api.Extensions;

public static class SwaggerExtensions
{
    private const string BearerSchemeName = "Bearer";

    public static IServiceCollection AddSwaggerWithJwt(this IServiceCollection services)
    {
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen(options =>
        {
            options.SwaggerDoc("v1", new OpenApiInfo
            {
                Title = "Ticket Management API",
                Version = "v1"
            });

            options.AddSecurityDefinition(BearerSchemeName, new OpenApiSecurityScheme
            {
                Name = "Authorization",
                Description = "Paste the JWT returned by /api/auth/login.",
                In = ParameterLocation.Header,
                Type = SecuritySchemeType.Http,
                Scheme = "bearer",
                BearerFormat = "JWT"
            });

            options.AddSecurityRequirement(document => new OpenApiSecurityRequirement
            {
                [new OpenApiSecuritySchemeReference(BearerSchemeName, document)] = []
            });
        });

        return services;
    }
}
