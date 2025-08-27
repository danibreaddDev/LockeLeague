import { Routes } from '@angular/router';

export default [
  {
    path: 'lockes',
    loadComponent: () => import('../lockes/lockes').then((m) => m.Lockes),
  },
  {
    path: 'locke/:id',
    loadComponent: () => import('./locke/locke').then((m) => m.Locke),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./locke/locke-detail/locke-detail').then(
            (m) => m.LockeDetail
          ),
      },
      {
        path: 'teams',
        loadComponent: () => import('./locke/teams/teams').then((m) => m.Teams),
      },
      {
        path: 'rules',
        loadComponent: () => import('./locke/rules/rules').then((m) => m.Rules),
      },
      {
        path: 'tournaments',
        loadComponent: () =>
          import('./locke/tournaments/tournaments').then((m) => m.Tournaments),
      },
    ],
  },
] as Routes;
