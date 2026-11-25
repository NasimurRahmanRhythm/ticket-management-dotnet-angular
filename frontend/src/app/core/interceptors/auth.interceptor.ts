import { HttpErrorResponse, HttpInterceptorFn, HttpStatusCode } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const authService = inject(AuthService);
  const token = authService.token();
  const isApiRequest = request.url.startsWith(environment.apiBaseUrl);

  const outgoingRequest =
    token && isApiRequest
      ? request.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
      : request;

  return next(outgoingRequest).pipe(
    catchError((error: unknown) => {
      if (token && error instanceof HttpErrorResponse && error.status === HttpStatusCode.Unauthorized) {
        authService.expireSession();
      }

      return throwError(() => error);
    }),
  );
};
