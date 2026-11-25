import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { TicketStatus } from '../../../../core/models/ticket-status.enum';
import { TICKET_STATUS_LABELS } from '../../ticket-options';

@Component({
  selector: 'app-status-badge',
  template: `<span class="badge" [class]="'badge--' + status()">{{ label() }}</span>`,
  styleUrl: '../badge.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusBadgeComponent {
  readonly status = input.required<TicketStatus>();

  protected readonly label = computed(() => TICKET_STATUS_LABELS[this.status()]);
}
