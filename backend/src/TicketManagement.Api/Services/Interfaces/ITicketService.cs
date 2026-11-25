using TicketManagement.Api.DTOs.Tickets;

namespace TicketManagement.Api.Services.Interfaces;

public interface ITicketService
{
    Task<IReadOnlyList<TicketResponse>> GetAllAsync(TicketQueryParameters query, CancellationToken cancellationToken);

    Task<TicketResponse> GetByIdAsync(int id, CancellationToken cancellationToken);

    Task<TicketResponse> CreateAsync(CreateTicketRequest request, CancellationToken cancellationToken);

    Task<TicketResponse> UpdateAsync(int id, UpdateTicketRequest request, CancellationToken cancellationToken);

    Task DeleteAsync(int id, CancellationToken cancellationToken);
}
