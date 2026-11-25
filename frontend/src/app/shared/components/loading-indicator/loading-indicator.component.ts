import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-loading-indicator',
  template: `<p class="loading" aria-live="polite">{{ label() }}</p>`,
  styles: `
    .loading {
      padding: var(--space-6) 0;
      text-align: center;
      color: var(--color-text-muted);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingIndicatorComponent {
  readonly label = input('Loading…');
}
