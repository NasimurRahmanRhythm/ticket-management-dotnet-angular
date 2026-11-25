import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { AppPaths } from '../../../core/constants/app-paths';
import { AuthService } from '../../../core/services/auth.service';
import { getHttpErrorMessage } from '../../../core/utils/http-error-message';
import { AlertComponent } from '../../../shared/components/alert/alert.component';
import { FormFieldErrorComponent } from '../../../shared/components/form-field-error/form-field-error.component';
import { AuthValidation } from '../auth-validation';
import { PASSWORD_MISMATCH_ERROR, passwordMatchValidator } from '../validators/password-match.validator';

@Component({
  selector: 'app-register-page',
  imports: [ReactiveFormsModule, RouterLink, AlertComponent, FormFieldErrorComponent],
  templateUrl: './register-page.component.html',
  styleUrl: '../auth-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterPageComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly loginPath = `/${AppPaths.login}`;
  protected readonly passwordMismatchError = PASSWORD_MISMATCH_ERROR;
  protected readonly submitting = signal(false);
  protected readonly errorMessage = signal<string | null>(null);
  protected readonly form = inject(NonNullableFormBuilder).group(
    {
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(AuthValidation.nameMinLength),
          Validators.maxLength(AuthValidation.nameMaxLength),
        ],
      ],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(AuthValidation.emailMaxLength)]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(AuthValidation.passwordMinLength),
          Validators.maxLength(AuthValidation.passwordMaxLength),
        ],
      ],
      confirmPassword: ['', Validators.required],
    },
    { validators: passwordMatchValidator('password', 'confirmPassword') },
  );

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { name, email, password } = this.form.getRawValue();
    this.submitting.set(true);
    this.errorMessage.set(null);

    this.authService
      .register({ name, email, password })
      .pipe(finalize(() => this.submitting.set(false)))
      .subscribe({
        next: () => void this.router.navigate(['/', AppPaths.tickets]),
        error: (error: unknown) => this.errorMessage.set(getHttpErrorMessage(error)),
      });
  }
}
