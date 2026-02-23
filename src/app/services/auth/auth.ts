import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthRequest } from '../../models/requests/auth.request.model';
import { AuthToken } from '../../models/auth-token.model';

@Injectable({providedIn: 'root'})
export class AuthService {
  private httpClient = inject(HttpClient);

  login(request: AuthRequest): Observable<AuthToken> {
    return this.httpClient
               .post<AuthToken>(
                  'auth/login',
                  request
                );
  }
}
