import { Routes } from '@angular/router';
import { AppPaths } from '../../core/constants/app-paths';

export const authRoutes: Routes = [
  {
    path: AppPaths.login,
    title: 'Log in',
    loadComponent: () => import('./login-page/login-page.component').then((m) => m.LoginPageComponent),
  },
  {
    path: AppPaths.register,
    title: 'Create account',
    loadComponent: () =>
      import('./register-page/register-page.component').then((m) => m.RegisterPageComponent),
  },
];
