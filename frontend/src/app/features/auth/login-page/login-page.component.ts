import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { AppPaths } from '../../../core/constants/app-paths';
import { AuthService } from '../../../core/services/auth.service';
import { getHttpErrorMessage } from '../../../core/utils/http-error-message';
import { toSafeReturnUrl } from '../../../core/utils/safe-return-url';
import { AlertComponent } from '../../../shared/components/alert/alert.component';
import { FormFieldErrorComponent } from '../../../shared/components/form-field-error/form-field-error.component';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule, RouterLink, AlertComponent, FormFieldErrorComponent],
  templateUrl: './login-page.component.html',
  styleUrl: '../auth-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  readonly returnUrl = input<string>();

  protected readonly registerPath = `/${AppPaths.register}`;
  protected readonly submitting = signal(false);
  protected readonly errorMessage = signal<string | null>(null);
  protected readonly form = inject(NonNullableFormBuilder).group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting.set(true);
    this.errorMessage.set(null);

    this.authService
      .login(this.form.getRawValue())
      .pipe(finalize(() => this.submitting.set(false)))
      .subscribe({
        next: () => void this.router.navigateByUrl(toSafeReturnUrl(this.returnUrl())),
        error: (error: unknown) => this.errorMessage.set(getHttpErrorMessage(error)),
      });
  }
}
