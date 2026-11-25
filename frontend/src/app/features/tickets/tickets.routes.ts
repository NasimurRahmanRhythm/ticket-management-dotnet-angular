import { Routes } from '@angular/router';
import { AppPaths } from '../../core/constants/app-paths';

export const ticketRoutes: Routes = [
  {
    path: '',
    title: 'My tickets',
    loadComponent: () =>
      import('./pages/ticket-list-page/ticket-list-page.component').then((m) => m.TicketListPageComponent),
  },
  {
    path: AppPaths.newTicket,
    title: 'New ticket',
    loadComponent: () =>
      import('./pages/ticket-form-page/ticket-form-page.component').then((m) => m.TicketFormPageComponent),
  },
  {
    path: ':id',
    title: 'Ticket details',
    loadComponent: () =>
      import('./pages/ticket-details-page/ticket-details-page.component').then(
        (m) => m.TicketDetailsPageComponent,
      ),
  },
  {
    path: `:id/${AppPaths.editTicket}`,
    title: 'Edit ticket',
    loadComponent: () =>
      import('./pages/ticket-form-page/ticket-form-page.component').then((m) => m.TicketFormPageComponent),
  },
];
