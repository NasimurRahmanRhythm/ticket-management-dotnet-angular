using System.Globalization;
using Microsoft.IdentityModel.JsonWebTokens;
using TicketManagement.Api.Services.Interfaces;

namespace TicketManagement.Api.Services;

public class CurrentUserService : ICurrentUserService
{
    private readonly IHttpContextAccessor _httpContextAccessor;

    public CurrentUserService(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
    }

    public int UserId
    {
        get
        {
            var subject = _httpContextAccessor.HttpContext?.User.FindFirst(JwtRegisteredClaimNames.Sub)?.Value;

            if (!int.TryParse(subject, NumberStyles.Integer, CultureInfo.InvariantCulture, out var userId))
            {
                throw new UnauthorizedAccessException("The current request is not associated with a valid user.");
            }

            return userId;
        }
    }
}
