import { HttpInterceptorFn } from '@angular/common/http';

export const supabaseAuthInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
