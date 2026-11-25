namespace TicketManagement.Api.Entities;

public class Ticket
{
    public int Id { get; set; }

    public string Title { get; set; } = string.Empty;

    public string? Description { get; set; }

    public TicketStatus Status { get; set; }

    public TicketPriority Priority { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }

    public int CreatedByUserId { get; set; }

    public User? CreatedByUser { get; set; }
}
