namespace TicketManagement.Api.Exceptions;

public sealed class NotFoundException : AppException
{
    public NotFoundException(string resourceName, object key)
        : base($"{resourceName} with id '{key}' was not found.")
    {
    }

    public override int StatusCode => StatusCodes.Status404NotFound;

    public override string Title => "Resource not found";
}
