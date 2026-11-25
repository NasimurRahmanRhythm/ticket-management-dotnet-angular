using System.ComponentModel.DataAnnotations;
using TicketManagement.Api.Entities;

namespace TicketManagement.Api.DTOs.Tickets;

public class TicketQueryParameters
{
    [EnumDataType(typeof(TicketStatus))]
    public TicketStatus? Status { get; init; }
}
