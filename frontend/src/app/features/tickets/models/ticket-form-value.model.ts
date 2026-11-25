import { TicketPriority } from '../../../core/models/ticket-priority.enum';
import { TicketStatus } from '../../../core/models/ticket-status.enum';

export interface TicketFormValue {
  title: string;
  description: string;
  priority: TicketPriority;
  status: TicketStatus;
}
