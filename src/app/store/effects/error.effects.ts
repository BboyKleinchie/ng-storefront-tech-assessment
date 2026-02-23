import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs'
import { switchMap } from 'rxjs/operators';

import { authenticateUserFailure } from '../actions/auth.actions';
import { getProductDetailsFailure, getProductsFailure } from '../actions/products.actions';
import { setErrorMessage } from '../actions/errors.actions';
import { getUsersFailure, registerUserFailure } from '../actions/user.actions';

@Injectable()
export class ErrorEffects {
  private actions$ = inject(Actions);

  handleErrors$ = createEffect(() =>
      this.actions$.pipe(
      ofType(
        authenticateUserFailure,
        getProductDetailsFailure,
        getProductsFailure,
        getUsersFailure,
        registerUserFailure
      ),
      switchMap((action) => of(setErrorMessage({errorMessage: action.errorMessage})))
    )
  );
}
