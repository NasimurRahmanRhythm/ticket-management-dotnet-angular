import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { TicketStatus } from '../../../../core/models/ticket-status.enum';
import { TICKET_STATUS_OPTIONS } from '../../ticket-options';

@Component({
  selector: 'app-ticket-filter-bar',
  templateUrl: './ticket-filter-bar.component.html',
  styleUrl: './ticket-filter-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TicketFilterBarComponent {
  readonly selectedStatus = input<TicketStatus | null>(null);
  readonly statusChange = output<TicketStatus | null>();

  protected readonly statusOptions = TICKET_STATUS_OPTIONS;

  protected select(status: TicketStatus | null): void {
    if (status !== this.selectedStatus()) {
      this.statusChange.emit(status);
    }
  }
}
