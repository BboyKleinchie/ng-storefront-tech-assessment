import { createAction, props } from '@ngrx/store';

import { Cart } from '../../models/cart.model';
import { NewCartRequest } from '../../models/requests/new-cart.request.model';

export const listCarts = createAction('[Cart] List carts');
export const listCartsSuccess = createAction('[Cart] List carts success', props<{carts: Cart[]}>());
export const listCartsFailure = createAction('[Cart] List carts failure', props<{errorMessage: string}>());

export const getCart = createAction('[Cart] Get cart', props<{cartId: number}>());
export const getCartSuccess = createAction('[Cart] Get cart success', props<{cart: Cart}>());
export const getCartFailure = createAction('[Cart] Get cart failure', props<{errorMessage: string}>());
export const clearCart = createAction('[Cart] Clear cart');

export const addCart = createAction('[Cart] Add cart', props<{request: NewCartRequest}>());
export const addCartSuccess = createAction('[Cart] Add cart success', props<{cart: Cart | null}>());
export const addCartFailure = createAction('[Cart] Add cart failure', props<{errorMessage: string}>());
export const clearAddedCart = createAction('[Cart] Clear added cart');

export const updateCart = createAction('[Cart] Update cart', props<{cartId: number; request: NewCartRequest}>());
export const updateCartSuccess = createAction('[Cart] Update cart success', props<{cart: Cart | null}>());
export const updateCartFailure = createAction('[Cart] Update cart failure', props<{errorMessage: string}>());
export const clearUpdatedCart = createAction('[Cart] Clear updated cart');
