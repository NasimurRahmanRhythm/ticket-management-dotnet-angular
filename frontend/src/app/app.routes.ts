import { Routes } from '@angular/router';
import { AppPaths } from './core/constants/app-paths';
import { authGuard } from './core/guards/auth.guard';
import { guestGuard } from './core/guards/guest.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: AppPaths.tickets },
  {
    path: '',
    canActivate: [guestGuard],
    loadChildren: () => import('./features/auth/auth.routes').then((m) => m.authRoutes),
  },
  {
    path: AppPaths.tickets,
    canActivate: [authGuard],
    loadChildren: () => import('./features/tickets/tickets.routes').then((m) => m.ticketRoutes),
  },
  { path: '**', redirectTo: AppPaths.tickets },
];
