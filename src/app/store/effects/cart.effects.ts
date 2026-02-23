import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { CartStore } from './../models/cart.store.model';

import { CartService } from './../../services/cart/cart';
import {
  addCart,
  addCartFailure,
  addCartSuccess,
  getCart,
  getCartFailure,
  getCartSuccess,
  listCarts,
  listCartsFailure,
  listCartsSuccess,
  updateCart,
  updateCartFailure,
  updateCartSuccess
} from '../actions/cart.actions';
import { selectCarts } from '../selectors/cart.selectors';
import { Cart } from '../../models/cart.model';
import { isArrayNullOrEmpty, isCollectionNullOrEmpty } from '../../utils/isEmptyChecks.utils';

@Injectable()
export class CartEffects {
  private actions$ = inject(Actions);
  private cartService = inject(CartService);
  private store = inject(Store<CartStore>);

  listCarts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(listCarts),
      switchMap(() =>
        this.cartService
            .listCarts()
            .pipe(
              map(carts => listCartsSuccess({carts})),
              catchError(error => of(listCartsFailure({
                errorMessage: "Error retrieving list of carts. Please try again later"
              })))
            )
      )
    )
  )

  getCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getCart),
      switchMap((action) =>
        this.cartService
            .getCart(action.cartId)
            .pipe(
              map(cart => getCartSuccess({cart})),
              catchError(error => of(getCartFailure({
                errorMessage: "Error retrieving cart. Please try again later"
              })))
            )
      )
    )
  )

  addCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addCart),
      withLatestFrom(this.store.select(selectCarts)),
      switchMap(([action, carts]) =>
        this.cartService
            .addCart(action.request)
            .pipe(
              map(response => this.findCart(response.id, carts as Cart[])),
              map(cart => addCartSuccess({cart})),
              catchError(error => of(addCartFailure({
                errorMessage: "Error adding product to cart. Please try again later"
              })))
            )
      )
    )
  )

  updateCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateCart),
      withLatestFrom(this.store.select(selectCarts)),
      switchMap(([action, carts]) =>
        this.cartService
            .updateCart(action.cartId, action.request)
            .pipe(
              map(response => this.findCart(response.id, carts)),
              map(cart => {
                return updateCartSuccess({cart});
              }),
              catchError(error => of(updateCartFailure({
                errorMessage: "Error updating cart with more products. Please try again later"
              })))
            )
      )
    )
  )

  private findCart(cartId: number, carts: Cart[]): Cart | null {
    const cart = carts?.find((cart) => cart.id === cartId);
    if (
      isArrayNullOrEmpty(carts ?? [])
      || isCollectionNullOrEmpty(cart)
    ) return null;

    return cart ?? null;
  }
}
