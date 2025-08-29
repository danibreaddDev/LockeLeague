import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
  },

  {
    canActivate: [authGuard],
    path: '',
    loadChildren: () => import('./pages/lockes/lockes.routes'),
  },
  {
    canActivate: [authGuard],
    path: 'profile',
    loadComponent: () =>
      import('./pages/profile/profile').then((m) => m.Profile),
  },
  {
    path: 'faqs',
    loadComponent: () => import('./pages/faqs/faqs').then((m) => m.Faqs),
  },
];
