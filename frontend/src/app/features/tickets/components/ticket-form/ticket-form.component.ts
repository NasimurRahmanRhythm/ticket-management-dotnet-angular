import { ChangeDetectionStrategy, Component, computed, effect, inject, input, output } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TicketPriority } from '../../../../core/models/ticket-priority.enum';
import { TicketStatus } from '../../../../core/models/ticket-status.enum';
import { Ticket } from '../../../../core/models/ticket.model';
import { FormFieldErrorComponent } from '../../../../shared/components/form-field-error/form-field-error.component';
import { TicketFormValue } from '../../models/ticket-form-value.model';
import { TICKET_PRIORITY_OPTIONS, TICKET_STATUS_OPTIONS } from '../../ticket-options';
import { TicketValidation } from '../../ticket-validation';

@Component({
  selector: 'app-ticket-form',
  imports: [ReactiveFormsModule, FormFieldErrorComponent],
  templateUrl: './ticket-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TicketFormComponent {
  readonly ticket = input<Ticket | null>(null);
  readonly submitting = input(false);
  readonly formSubmit = output<TicketFormValue>();
  readonly cancelled = output();

  protected readonly isEditMode = computed(() => this.ticket() !== null);
  protected readonly statusOptions = TICKET_STATUS_OPTIONS;
  protected readonly priorityOptions = TICKET_PRIORITY_OPTIONS;
  protected readonly form = inject(NonNullableFormBuilder).group({
    title: [
      '',
      [
        Validators.required,
        Validators.minLength(TicketValidation.titleMinLength),
        Validators.maxLength(TicketValidation.titleMaxLength),
      ],
    ],
    description: ['', Validators.maxLength(TicketValidation.descriptionMaxLength)],
    priority: [TicketPriority.Medium, Validators.required],
    status: [TicketStatus.Open, Validators.required],
  });

  constructor() {
    effect(() => {
      const ticket = this.ticket();
      if (ticket) {
        this.form.reset({
          title: ticket.title,
          description: ticket.description ?? '',
          priority: ticket.priority,
          status: ticket.status,
        });
      }
    });
  }

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.formSubmit.emit(this.form.getRawValue());
  }
}
