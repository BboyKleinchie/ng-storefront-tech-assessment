import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { APP_CONSTANTS } from '../app.constants';

export function apiInterceptor(request: HttpRequest<unknown>, next: HttpHandlerFn) {
  const req = request.clone({ url: `${APP_CONSTANTS.API_URL}/${request.url}` });

  return next(req);
}
