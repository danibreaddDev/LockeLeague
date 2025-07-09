import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
  },
  {
    canActivate: [authGuard],
    path: 'menu',
    loadComponent: () => import('./pages/menu/menu').then((m) => m.Menu),
  },
  {
    canActivate: [authGuard],
    path: '',
    loadChildren: () => import('./pages/lockes/lockes.routes'),
  },
];
