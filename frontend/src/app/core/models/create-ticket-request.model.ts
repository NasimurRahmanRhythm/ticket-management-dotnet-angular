import { TicketPriority } from './ticket-priority.enum';

export interface CreateTicketRequest {
  title: string;
  description: string | null;
  priority: TicketPriority;
}
