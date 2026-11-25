import { HttpErrorResponse } from '@angular/common/http';
import { ProblemDetails } from '../models/problem-details.model';

const NETWORK_ERROR_MESSAGE = 'Unable to reach the server. Please try again.';
const FALLBACK_ERROR_MESSAGE = 'Something went wrong. Please try again.';

export function getHttpErrorMessage(error: unknown): string {
  if (!(error instanceof HttpErrorResponse)) {
    return FALLBACK_ERROR_MESSAGE;
  }

  if (error.status === 0) {
    return NETWORK_ERROR_MESSAGE;
  }

  const problem = error.error as ProblemDetails | null;
  const validationMessages = Object.values(problem?.errors ?? {}).flat();

  if (validationMessages.length > 0) {
    return validationMessages.join(' ');
  }

  return problem?.detail ?? problem?.title ?? FALLBACK_ERROR_MESSAGE;
}
