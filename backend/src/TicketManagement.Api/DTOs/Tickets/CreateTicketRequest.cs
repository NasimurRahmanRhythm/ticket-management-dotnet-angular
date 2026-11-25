using System.ComponentModel.DataAnnotations;
using TicketManagement.Api.Data;
using TicketManagement.Api.Entities;

namespace TicketManagement.Api.DTOs.Tickets;

public class CreateTicketRequest
{
    [Required]
    [StringLength(FieldLengths.TicketTitle, MinimumLength = 3)]
    public string Title { get; init; } = string.Empty;

    [StringLength(FieldLengths.TicketDescription)]
    public string? Description { get; init; }

    [Required]
    [EnumDataType(typeof(TicketPriority))]
    public TicketPriority? Priority { get; init; }
}
