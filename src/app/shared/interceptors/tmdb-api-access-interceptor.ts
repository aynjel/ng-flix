import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export const tmdbApiAccessInterceptor: HttpInterceptorFn = (req, next) => {
  const modifiedRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${environment.tmdbReadAccessToken}`,
    },
  });

  return next(modifiedRequest);
};
