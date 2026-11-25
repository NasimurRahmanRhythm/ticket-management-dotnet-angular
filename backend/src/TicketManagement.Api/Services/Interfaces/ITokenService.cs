using TicketManagement.Api.DTOs.Auth;
using TicketManagement.Api.Entities;

namespace TicketManagement.Api.Services.Interfaces;

public interface ITokenService
{
    AuthResponse CreateAuthResponse(User user);
}
