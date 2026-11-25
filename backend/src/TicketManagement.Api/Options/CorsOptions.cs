namespace TicketManagement.Api.Options;

public class CorsOptions
{
    public const string SectionName = "Cors";

    public const string FrontendPolicyName = "Frontend";

    public string[] AllowedOrigins { get; init; } = [];
}
