import { TicketPriority } from './ticket-priority.enum';
import { TicketStatus } from './ticket-status.enum';

export interface Ticket {
  id: number;
  title: string;
  description: string | null;
  status: TicketStatus;
  priority: TicketPriority;
  createdAt: string;
  updatedAt: string;
}
