namespace TicketManagement.Api.Exceptions;

public sealed class InvalidCredentialsException : AppException
{
    public InvalidCredentialsException()
        : base("The email or password is incorrect.")
    {
    }

    public override int StatusCode => StatusCodes.Status401Unauthorized;

    public override string Title => "Invalid credentials";
}
