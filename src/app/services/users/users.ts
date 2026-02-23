import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { NewUserRequest } from '../../models/requests/new-user.request.model';
import { NewUserResponse } from '../../models/responses/new-user.response';
import { User } from '../../models/user.model';

@Injectable({providedIn: 'root'})
export class UsersService {
  private httpClient = inject(HttpClient);

  listUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>('users');
  }

  getUser(userId: number): Observable<User> {
    return this.httpClient.get<User>(`users/${userId.toString()}`);
  }

  registerUser(request: NewUserRequest): Observable<NewUserResponse> {
    return this.httpClient
               .post<NewUserResponse>(
                'users',
                request
               );
  }
}
