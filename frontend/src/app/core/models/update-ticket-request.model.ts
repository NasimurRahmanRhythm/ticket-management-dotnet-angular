import { CreateTicketRequest } from './create-ticket-request.model';
import { TicketStatus } from './ticket-status.enum';

export interface UpdateTicketRequest extends CreateTicketRequest {
  status: TicketStatus;
}
