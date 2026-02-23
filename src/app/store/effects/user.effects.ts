import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, switchMap, map } from 'rxjs/operators';

import { getUser, getUserFailure, getUsers, getUsersFailure, getUsersSuccess, getUserSuccess, registerUser, registerUserFailure, registerUserSuccess } from './../actions/user.actions';
import { UsersService } from '../../services/users/users';

@Injectable()
export class UserEffects {
  private actions$ = inject(Actions);
  private usersService = inject(UsersService);

  getUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getUsers),
      switchMap(() =>
        this.usersService
            .listUsers()
            .pipe(
              map(users => getUsersSuccess({users})),
              catchError(() => of(getUsersFailure({errorMessage: 'Error retrieving users. Please try again later'}))
              )
            )
      )
    )
  )

  getUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getUser),
      switchMap((action) =>
        this.usersService
            .getUser(action.userId)
            .pipe(
              map(user => getUserSuccess({user})),
              catchError(() => of(getUserFailure({errorMessage: 'Error retrieving user. Please try again later'}))
              )
            )
      )
    )
  )

  registerUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(registerUser),
      switchMap((action) =>
        this.usersService
            .registerUser(action.request)
            .pipe(
              map(response => registerUserSuccess({userId: response.id})),
              catchError(() => of(registerUserFailure({errorMessage: 'Error registering a new user. Please try again later'}))
              )
            )
      )
    )
  )
}
