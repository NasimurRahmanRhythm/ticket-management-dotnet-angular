import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { TicketPriority } from '../../../../core/models/ticket-priority.enum';
import { TICKET_PRIORITY_LABELS } from '../../ticket-options';

@Component({
  selector: 'app-priority-badge',
  template: `<span class="badge" [class]="'badge--priority-' + priority()">{{ label() }} priority</span>`,
  styleUrl: '../badge.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PriorityBadgeComponent {
  readonly priority = input.required<TicketPriority>();

  protected readonly label = computed(() => TICKET_PRIORITY_LABELS[this.priority()]);
}
