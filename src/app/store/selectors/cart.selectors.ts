import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartStore } from '../models/cart.store.model';

export const selectCartState = createFeatureSelector<CartStore>('cart');
export const selectCarts = createSelector(selectCartState, (state) => state.carts);
export const selectCart = createSelector(selectCartState, (state) => state.cart);
export const selectCartAdded = createSelector(selectCartState, (state) => state.cartAdded);
export const selectCartUpdated = createSelector(selectCartState, (state) => state.cartUpdated);
export const selectCartIsLoading = createSelector(selectCartState, (state) => state.isLoading);
