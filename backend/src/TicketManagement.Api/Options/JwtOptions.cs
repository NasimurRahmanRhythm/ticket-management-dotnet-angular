using System.ComponentModel.DataAnnotations;

namespace TicketManagement.Api.Options;

public class JwtOptions
{
    public const string SectionName = "Jwt";

    private const int MinimumSecretKeyLength = 32;

    [Required]
    public string Issuer { get; init; } = string.Empty;

    [Required]
    public string Audience { get; init; } = string.Empty;

    [Required]
    [MinLength(MinimumSecretKeyLength)]
    public string SecretKey { get; init; } = string.Empty;

    [Range(1, 1440)]
    public int ExpirationMinutes { get; init; } = 60;
}
