import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { AuthService } from '../../services/auth/auth';
import { authenticateUser, authenticateUserFailure, authenticateUserSuccess, logoutUser } from '../actions/auth.actions';
import { Store } from '@ngrx/store';
import { clearAddedCart, clearCart, clearUpdatedCart } from '../actions/cart.actions';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private authService = inject(AuthService);
  private store = inject(Store);

  authenticateUser$ = createEffect(() =>
      this.actions$.pipe(
      ofType(authenticateUser),
      switchMap((action) =>
        this.authService
            .login(action.request)
            .pipe(
              map(authToken => authenticateUserSuccess({token: authToken.token})),
              catchError(() =>
                of(authenticateUserFailure({errorMessage: "Error authenticating user. Please try again later."} ))
              )
            )
      )
    )
  );

  logoutUser$ = createEffect(() =>
      this.actions$.pipe(
      ofType(logoutUser),
      tap(() => {
        this.store.dispatch(clearCart());
        this.store.dispatch(clearAddedCart());
        this.store.dispatch(clearUpdatedCart());
      })
    ), { dispatch: false }
  );
}
