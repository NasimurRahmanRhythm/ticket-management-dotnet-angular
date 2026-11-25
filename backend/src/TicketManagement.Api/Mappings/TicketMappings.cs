using System.Linq.Expressions;
using TicketManagement.Api.DTOs.Tickets;
using TicketManagement.Api.Entities;

namespace TicketManagement.Api.Mappings;

public static class TicketMappings
{
    public static readonly Expression<Func<Ticket, TicketResponse>> ToResponseExpression = ticket =>
        new TicketResponse(
            ticket.Id,
            ticket.Title,
            ticket.Description,
            ticket.Status,
            ticket.Priority,
            ticket.CreatedAt,
            ticket.UpdatedAt);

    private static readonly Func<Ticket, TicketResponse> CompiledToResponse = ToResponseExpression.Compile();

    public static TicketResponse ToResponse(this Ticket ticket) => CompiledToResponse(ticket);
}
