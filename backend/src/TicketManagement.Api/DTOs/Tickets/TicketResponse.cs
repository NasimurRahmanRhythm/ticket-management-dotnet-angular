using TicketManagement.Api.Entities;

namespace TicketManagement.Api.DTOs.Tickets;

public record TicketResponse(
    int Id,
    string Title,
    string? Description,
    TicketStatus Status,
    TicketPriority Priority,
    DateTime CreatedAt,
    DateTime UpdatedAt);
