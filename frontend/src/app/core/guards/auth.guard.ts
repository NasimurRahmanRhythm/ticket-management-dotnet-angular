import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AppPaths } from '../constants/app-paths';
import { QueryParams } from '../constants/query-params';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (_route, state) => {
  if (inject(AuthService).isAuthenticated()) {
    return true;
  }

  return inject(Router).createUrlTree(['/', AppPaths.login], {
    queryParams: { [QueryParams.returnUrl]: state.url },
  });
};
