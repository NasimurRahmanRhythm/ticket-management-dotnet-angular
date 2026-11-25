import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Ticket } from '../../../../core/models/ticket.model';
import { PriorityBadgeComponent } from '../priority-badge/priority-badge.component';
import { StatusBadgeComponent } from '../status-badge/status-badge.component';

@Component({
  selector: 'app-ticket-card',
  imports: [DatePipe, RouterLink, StatusBadgeComponent, PriorityBadgeComponent],
  templateUrl: './ticket-card.component.html',
  styleUrl: './ticket-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TicketCardComponent {
  readonly ticket = input.required<Ticket>();
}
