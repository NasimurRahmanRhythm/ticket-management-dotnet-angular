import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { Router, RouterLink } from '@angular/router';
import { AppPaths } from '../../../../core/constants/app-paths';
import { QueryParams } from '../../../../core/constants/query-params';
import { TicketStatus } from '../../../../core/models/ticket-status.enum';
import { getHttpErrorMessage } from '../../../../core/utils/http-error-message';
import { AlertComponent } from '../../../../shared/components/alert/alert.component';
import { LoadingIndicatorComponent } from '../../../../shared/components/loading-indicator/loading-indicator.component';
import { TicketCardComponent } from '../../components/ticket-card/ticket-card.component';
import { TicketFilterBarComponent } from '../../components/ticket-filter-bar/ticket-filter-bar.component';
import { TicketService } from '../../services/ticket.service';
import { parseTicketStatus } from '../../ticket-options';

@Component({
  selector: 'app-ticket-list-page',
  imports: [RouterLink, AlertComponent, LoadingIndicatorComponent, TicketCardComponent, TicketFilterBarComponent],
  templateUrl: './ticket-list-page.component.html',
  styleUrl: './ticket-list-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TicketListPageComponent {
  private readonly ticketService = inject(TicketService);
  private readonly router = inject(Router);

  readonly status = input<string>();

  protected readonly newTicketPath = AppPaths.newTicket;
  protected readonly selectedStatus = computed(() => parseTicketStatus(this.status()));
  protected readonly tickets = rxResource({
    params: () => ({ status: this.selectedStatus() }),
    stream: ({ params }) => this.ticketService.getAll(params.status),
  });
  protected readonly errorMessage = computed(() =>
    this.tickets.error() ? getHttpErrorMessage(this.tickets.error()) : null,
  );

  protected onStatusChange(status: TicketStatus | null): void {
    void this.router.navigate([], {
      queryParams: { [QueryParams.status]: status },
      queryParamsHandling: 'merge',
    });
  }
}
