import { TicketPriority } from '../../core/models/ticket-priority.enum';
import { TicketStatus } from '../../core/models/ticket-status.enum';

export interface SelectOption<T> {
  value: T;
  label: string;
}

export const TICKET_STATUS_LABELS: Record<TicketStatus, string> = {
  [TicketStatus.Open]: 'Open',
  [TicketStatus.InProgress]: 'In progress',
  [TicketStatus.Closed]: 'Closed',
};

export const TICKET_PRIORITY_LABELS: Record<TicketPriority, string> = {
  [TicketPriority.Low]: 'Low',
  [TicketPriority.Medium]: 'Medium',
  [TicketPriority.High]: 'High',
};

export const TICKET_STATUS_OPTIONS: SelectOption<TicketStatus>[] = Object.values(TicketStatus).map((value) => ({
  value,
  label: TICKET_STATUS_LABELS[value],
}));

export const TICKET_PRIORITY_OPTIONS: SelectOption<TicketPriority>[] = Object.values(TicketPriority).map(
  (value) => ({ value, label: TICKET_PRIORITY_LABELS[value] }),
);

export function parseTicketStatus(value: string | undefined): TicketStatus | null {
  return Object.values(TicketStatus).find((status) => status === value) ?? null;
}
