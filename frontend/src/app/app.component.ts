import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppHeaderComponent } from './core/layout/app-header/app-header.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AppHeaderComponent],
  template: `
    <app-header />
    <main class="container app-main">
      <router-outlet />
    </main>
  `,
  styles: `
    .app-main {
      padding-top: var(--space-6);
      padding-bottom: var(--space-8);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
