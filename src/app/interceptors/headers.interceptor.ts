import { HttpHandlerFn, HttpHeaders, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';

import { AuthStore } from './../store/models/auth.store.model';
import { selectAuthToken } from '../store/selectors/auth.selectors';

import { isPropertyNull, isStringNullOrEmpty } from '../utils/isEmptyChecks.utils';

export function headersInterceptor(request: HttpRequest<unknown>, next: HttpHandlerFn) {
  const req = request.clone({
    headers: addAcceptToHeaders(
             addContentTypeToHeaders(
             addAuthTokenToHeaders(request.headers)
    ))
  });
  return next(req);
}

const addAcceptToHeaders = (existingHeaders: HttpHeaders) => createHeaders(existingHeaders).set('Accept', 'application/json');
const addContentTypeToHeaders = (existingHeaders: HttpHeaders) => createHeaders(existingHeaders).set('Content-Type', 'application/json');
const createHeaders = (existingHeaders: HttpHeaders) => isPropertyNull(existingHeaders) ? new HttpHeaders() : existingHeaders;

function addAuthTokenToHeaders(existingHeaders: HttpHeaders) {
  const store = inject(Store<AuthStore>);
  const token = toSignal(store.select(selectAuthToken));

  if (isStringNullOrEmpty(token() ?? '')) return existingHeaders;

  return createHeaders(existingHeaders).set('x-auth-token', token()!);
}
