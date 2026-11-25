import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const PASSWORD_MISMATCH_ERROR = 'passwordMismatch';

export function passwordMatchValidator(passwordKey: string, confirmKey: string): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const password = group.get(passwordKey)?.value as string | undefined;
    const confirmation = group.get(confirmKey)?.value as string | undefined;

    return password === confirmation ? null : { [PASSWORD_MISMATCH_ERROR]: true };
  };
}
