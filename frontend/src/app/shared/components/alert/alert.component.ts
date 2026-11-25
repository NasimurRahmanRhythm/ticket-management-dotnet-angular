import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-alert',
  template: `<div class="alert" role="alert">{{ message() }}</div>`,
  styles: `
    .alert {
      padding: var(--space-3) var(--space-4);
      border: 1px solid var(--color-danger-border);
      border-radius: var(--radius);
      background: var(--color-danger-soft);
      color: var(--color-danger);
      font-size: 0.9rem;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertComponent {
  readonly message = input.required<string>();
}
