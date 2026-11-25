import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { AppPaths } from '../../../../core/constants/app-paths';
import { getHttpErrorMessage } from '../../../../core/utils/http-error-message';
import { AlertComponent } from '../../../../shared/components/alert/alert.component';
import { LoadingIndicatorComponent } from '../../../../shared/components/loading-indicator/loading-indicator.component';
import { PriorityBadgeComponent } from '../../components/priority-badge/priority-badge.component';
import { StatusBadgeComponent } from '../../components/status-badge/status-badge.component';
import { TicketService } from '../../services/ticket.service';

const DELETE_CONFIRMATION = 'Delete this ticket? This cannot be undone.';

@Component({
  selector: 'app-ticket-details-page',
  imports: [DatePipe, RouterLink, AlertComponent, LoadingIndicatorComponent, PriorityBadgeComponent, StatusBadgeComponent],
  templateUrl: './ticket-details-page.component.html',
  styleUrl: './ticket-details-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TicketDetailsPageComponent {
  private readonly ticketService = inject(TicketService);
  private readonly router = inject(Router);

  readonly id = input.required<string>();

  protected readonly ticketsPath = `/${AppPaths.tickets}`;
  protected readonly editPath = AppPaths.editTicket;
  protected readonly deleting = signal(false);
  protected readonly deleteError = signal<string | null>(null);
  protected readonly ticket = rxResource({
    params: () => Number(this.id()),
    stream: ({ params: id }) => this.ticketService.getById(id),
  });
  protected readonly loadError = computed(() =>
    this.ticket.error() ? getHttpErrorMessage(this.ticket.error()) : null,
  );

  protected delete(): void {
    if (!window.confirm(DELETE_CONFIRMATION)) {
      return;
    }

    this.deleting.set(true);
    this.deleteError.set(null);

    this.ticketService
      .delete(Number(this.id()))
      .pipe(finalize(() => this.deleting.set(false)))
      .subscribe({
        next: () => void this.router.navigate([this.ticketsPath]),
        error: (error: unknown) => this.deleteError.set(getHttpErrorMessage(error)),
      });
  }
}
