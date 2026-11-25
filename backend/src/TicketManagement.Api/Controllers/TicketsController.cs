using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TicketManagement.Api.DTOs.Tickets;
using TicketManagement.Api.Services.Interfaces;

namespace TicketManagement.Api.Controllers;

[ApiController]
[Route("api/tickets")]
[Authorize]
[Produces("application/json")]
[ProducesResponseType(StatusCodes.Status401Unauthorized)]
public class TicketsController : ControllerBase
{
    private readonly ITicketService _ticketService;

    public TicketsController(ITicketService ticketService)
    {
        _ticketService = ticketService;
    }

    [HttpGet]
    [ProducesResponseType<IReadOnlyList<TicketResponse>>(StatusCodes.Status200OK)]
    [ProducesResponseType<ValidationProblemDetails>(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<IReadOnlyList<TicketResponse>>> GetAllAsync(
        [FromQuery] TicketQueryParameters query,
        CancellationToken cancellationToken)
    {
        return Ok(await _ticketService.GetAllAsync(query, cancellationToken));
    }

    [HttpGet("{id:int}")]
    [ProducesResponseType<TicketResponse>(StatusCodes.Status200OK)]
    [ProducesResponseType<ProblemDetails>(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<TicketResponse>> GetByIdAsync(int id, CancellationToken cancellationToken)
    {
        return Ok(await _ticketService.GetByIdAsync(id, cancellationToken));
    }

    [HttpPost]
    [ProducesResponseType<TicketResponse>(StatusCodes.Status201Created)]
    [ProducesResponseType<ValidationProblemDetails>(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<TicketResponse>> CreateAsync(
        CreateTicketRequest request,
        CancellationToken cancellationToken)
    {
        var ticket = await _ticketService.CreateAsync(request, cancellationToken);
        return CreatedAtAction(nameof(GetByIdAsync), new { id = ticket.Id }, ticket);
    }

    [HttpPut("{id:int}")]
    [ProducesResponseType<TicketResponse>(StatusCodes.Status200OK)]
    [ProducesResponseType<ValidationProblemDetails>(StatusCodes.Status400BadRequest)]
    [ProducesResponseType<ProblemDetails>(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<TicketResponse>> UpdateAsync(
        int id,
        UpdateTicketRequest request,
        CancellationToken cancellationToken)
    {
        return Ok(await _ticketService.UpdateAsync(id, request, cancellationToken));
    }

    [HttpDelete("{id:int}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType<ProblemDetails>(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> DeleteAsync(int id, CancellationToken cancellationToken)
    {
        await _ticketService.DeleteAsync(id, cancellationToken);
        return NoContent();
    }
}
