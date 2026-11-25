import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { Observable, finalize } from 'rxjs';
import { AppPaths } from '../../../../core/constants/app-paths';
import { Ticket } from '../../../../core/models/ticket.model';
import { getHttpErrorMessage } from '../../../../core/utils/http-error-message';
import { AlertComponent } from '../../../../shared/components/alert/alert.component';
import { LoadingIndicatorComponent } from '../../../../shared/components/loading-indicator/loading-indicator.component';
import { TicketFormComponent } from '../../components/ticket-form/ticket-form.component';
import { TicketFormValue } from '../../models/ticket-form-value.model';
import { TicketService } from '../../services/ticket.service';

@Component({
  selector: 'app-ticket-form-page',
  imports: [AlertComponent, LoadingIndicatorComponent, TicketFormComponent],
  templateUrl: './ticket-form-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TicketFormPageComponent {
  private readonly ticketService = inject(TicketService);
  private readonly router = inject(Router);

  readonly id = input<string>();

  protected readonly isEditMode = computed(() => this.id() !== undefined);
  protected readonly saving = signal(false);
  protected readonly saveError = signal<string | null>(null);
  protected readonly ticket = rxResource({
    params: () => (this.id() === undefined ? undefined : Number(this.id())),
    stream: ({ params: id }) => this.ticketService.getById(id),
  });
  protected readonly loadError = computed(() =>
    this.ticket.error() ? getHttpErrorMessage(this.ticket.error()) : null,
  );

  protected save(value: TicketFormValue): void {
    this.saving.set(true);
    this.saveError.set(null);

    this.persist(value)
      .pipe(finalize(() => this.saving.set(false)))
      .subscribe({
        next: (ticket) => void this.router.navigate(['/', AppPaths.tickets, ticket.id]),
        error: (error: unknown) => this.saveError.set(getHttpErrorMessage(error)),
      });
  }

  protected cancel(): void {
    const id = this.id();
    void this.router.navigate(id === undefined ? ['/', AppPaths.tickets] : ['/', AppPaths.tickets, id]);
  }

  private persist(value: TicketFormValue): Observable<Ticket> {
    const description = value.description.trim() || null;
    const id = this.id();

    if (id === undefined) {
      return this.ticketService.create({ title: value.title, description, priority: value.priority });
    }

    return this.ticketService.update(Number(id), { ...value, description });
  }
}
