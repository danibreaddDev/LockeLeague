import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { inject } from '@angular/core';
import { map } from 'rxjs';

export const authGuard: CanMatchFn = (route, segments) => {
  const router = inject(Router);

  return inject(AuthService).user$.pipe(
    map((user) => {
      if (user) {
        return true;
      }
      return router.createUrlTree(['/']);
    })
  );
};
