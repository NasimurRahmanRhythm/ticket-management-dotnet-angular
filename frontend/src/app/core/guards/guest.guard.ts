import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AppPaths } from '../constants/app-paths';
import { AuthService } from '../services/auth.service';

export const guestGuard: CanActivateFn = () => {
  if (!inject(AuthService).isAuthenticated()) {
    return true;
  }

  return inject(Router).createUrlTree(['/', AppPaths.tickets]);
};
