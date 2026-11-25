using Microsoft.EntityFrameworkCore;
using TicketManagement.Api.Data;
using TicketManagement.Api.DTOs.Tickets;
using TicketManagement.Api.Entities;
using TicketManagement.Api.Exceptions;
using TicketManagement.Api.Mappings;
using TicketManagement.Api.Services.Interfaces;

namespace TicketManagement.Api.Services;

public class TicketService : ITicketService
{
    private readonly ApplicationDbContext _dbContext;
    private readonly ICurrentUserService _currentUserService;
    private readonly TimeProvider _timeProvider;

    public TicketService(
        ApplicationDbContext dbContext,
        ICurrentUserService currentUserService,
        TimeProvider timeProvider)
    {
        _dbContext = dbContext;
        _currentUserService = currentUserService;
        _timeProvider = timeProvider;
    }

    public async Task<IReadOnlyList<TicketResponse>> GetAllAsync(
        TicketQueryParameters query,
        CancellationToken cancellationToken)
    {
        var tickets = OwnedTickets().AsNoTracking();

        if (query.Status.HasValue)
        {
            tickets = tickets.Where(ticket => ticket.Status == query.Status.Value);
        }

        return await tickets
            .OrderByDescending(ticket => ticket.UpdatedAt)
            .Select(TicketMappings.ToResponseExpression)
            .ToListAsync(cancellationToken);
    }

    public async Task<TicketResponse> GetByIdAsync(int id, CancellationToken cancellationToken)
    {
        var ticket = await FindOwnedTicketAsync(id, cancellationToken);
        return ticket.ToResponse();
    }

    public async Task<TicketResponse> CreateAsync(CreateTicketRequest request, CancellationToken cancellationToken)
    {
        var now = _timeProvider.GetUtcNow().UtcDateTime;

        var ticket = new Ticket
        {
            Title = request.Title.Trim(),
            Description = request.Description?.Trim(),
            Priority = request.Priority.GetValueOrDefault(),
            Status = TicketStatus.Open,
            CreatedAt = now,
            UpdatedAt = now,
            CreatedByUserId = _currentUserService.UserId
        };

        _dbContext.Tickets.Add(ticket);
        await _dbContext.SaveChangesAsync(cancellationToken);

        return ticket.ToResponse();
    }

    public async Task<TicketResponse> UpdateAsync(
        int id,
        UpdateTicketRequest request,
        CancellationToken cancellationToken)
    {
        var ticket = await FindOwnedTicketAsync(id, cancellationToken);

        ticket.Title = request.Title.Trim();
        ticket.Description = request.Description?.Trim();
        ticket.Status = request.Status.GetValueOrDefault();
        ticket.Priority = request.Priority.GetValueOrDefault();
        ticket.UpdatedAt = _timeProvider.GetUtcNow().UtcDateTime;

        await _dbContext.SaveChangesAsync(cancellationToken);

        return ticket.ToResponse();
    }

    public async Task DeleteAsync(int id, CancellationToken cancellationToken)
    {
        var ticket = await FindOwnedTicketAsync(id, cancellationToken);

        _dbContext.Tickets.Remove(ticket);
        await _dbContext.SaveChangesAsync(cancellationToken);
    }

    private IQueryable<Ticket> OwnedTickets()
    {
        var userId = _currentUserService.UserId;
        return _dbContext.Tickets.Where(ticket => ticket.CreatedByUserId == userId);
    }

    private async Task<Ticket> FindOwnedTicketAsync(int id, CancellationToken cancellationToken)
    {
        return await OwnedTickets().SingleOrDefaultAsync(ticket => ticket.Id == id, cancellationToken)
            ?? throw new NotFoundException(nameof(Ticket), id);
    }
}
