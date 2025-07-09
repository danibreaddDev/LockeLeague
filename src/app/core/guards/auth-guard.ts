import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { inject } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';

export const authGuard: CanMatchFn = (route, segments) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return authService.sessionLoaded$.pipe(
    switchMap(() => authService.user$),
    map((user) => (user ? true : router.createUrlTree(['/'])))
  );
};
