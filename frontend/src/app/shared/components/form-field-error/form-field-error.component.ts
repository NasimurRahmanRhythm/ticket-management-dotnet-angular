import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { AbstractControl } from '@angular/forms';
import { map, startWith, switchMap } from 'rxjs';
import { getValidationMessage } from '../../utils/validation-message';

@Component({
  selector: 'app-form-field-error',
  template: `
    @if (message(); as text) {
      <p class="field-error" role="alert">{{ text }}</p>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldErrorComponent {
  readonly control = input.required<AbstractControl>();

  protected readonly message = toSignal(
    toObservable(this.control).pipe(
      switchMap((control) =>
        control.events.pipe(
          startWith(null),
          map(() => getValidationMessage(control)),
        ),
      ),
    ),
    { initialValue: null },
  );
}
