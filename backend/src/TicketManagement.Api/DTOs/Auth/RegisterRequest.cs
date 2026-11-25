using System.ComponentModel.DataAnnotations;
using TicketManagement.Api.Data;

namespace TicketManagement.Api.DTOs.Auth;

public class RegisterRequest
{
    [Required]
    [StringLength(FieldLengths.UserName, MinimumLength = 2)]
    public string Name { get; init; } = string.Empty;

    [Required]
    [EmailAddress]
    [StringLength(FieldLengths.Email)]
    public string Email { get; init; } = string.Empty;

    [Required]
    [StringLength(FieldLengths.PasswordMax, MinimumLength = FieldLengths.PasswordMin)]
    public string Password { get; init; } = string.Empty;
}
