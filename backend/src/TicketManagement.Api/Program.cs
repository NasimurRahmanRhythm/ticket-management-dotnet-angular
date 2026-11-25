using TicketManagement.Api.Extensions;

var builder = WebApplication.CreateBuilder(args);

builder.Services
    .AddApiControllers()
    .AddPersistence(builder.Configuration)
    .AddJwtAuthentication(builder.Configuration)
    .AddApplicationServices()
    .AddFrontendCors(builder.Configuration)
    .AddSwaggerWithJwt();

var app = builder.Build();

app.UseApiPipeline();

app.Run();
