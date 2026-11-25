import { AbstractControl, ValidationErrors } from '@angular/forms';

interface LengthError {
  requiredLength: number;
}

export function getValidationMessage(control: AbstractControl): string | null {
  if (!control.touched || !control.errors) {
    return null;
  }

  return resolveMessage(control.errors);
}

function resolveMessage(errors: ValidationErrors): string {
  if (errors['required']) {
    return 'This field is required.';
  }

  if (errors['email']) {
    return 'Enter a valid email address.';
  }

  if (errors['minlength']) {
    return `Must be at least ${(errors['minlength'] as LengthError).requiredLength} characters.`;
  }

  if (errors['maxlength']) {
    return `Must be at most ${(errors['maxlength'] as LengthError).requiredLength} characters.`;
  }

  return 'This value is not valid.';
}
