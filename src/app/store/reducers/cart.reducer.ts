import { createReducer, on } from '@ngrx/store';
import { Cart } from '../../models/cart.model';
import { CartStore } from '../models/cart.store.model';
import {
  addCart,
  addCartFailure,
  addCartSuccess,
  clearAddedCart,
  clearCart,
  clearUpdatedCart,
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

const initialState: CartStore = {
  isLoading: false,
  carts: [] as Cart[],
  cart: null,
  cartAdded: null,
  cartUpdated: null
}

export const cartReducer = createReducer(
  initialState,
  on(listCarts, (state) => {
    return { ...state, isLoading: true }
  }),
  on(listCartsSuccess, (state, action) => {
    return { ...state, isLoading: false, carts: action.carts }
  }),
  on(listCartsFailure, (state) => {
    return { ...state, isLoading: false }
  }),
  on(getCart, (state) => {
    return { ...state, isLoading: true }
  }),
  on(getCartSuccess, (state, action) => {
    return { ...state, isLoading: false, cart: action.cart }
  }),
  on(getCartFailure, (state) => {
    return { ...state, isLoading: false }
  }),
  on(clearCart, (state) => {
    return { ...state, isLoading: false, cart: null }
  }),
  on(addCart, (state) => {
    return { ...state, isLoading: true }
  }),
  on(addCartSuccess, (state, action) => {
    return { ...state, isLoading: false, cartAdded: action.cart }
  }),
  on(addCartFailure, (state) => {
    return { ...state, isLoading: false }
  }),
  on(clearAddedCart, (state) => {
    return { ...state, cartAdded: null }
  }),
  on(updateCart, (state) => {
    return { ...state, isLoading: true }
  }),
  on(updateCartSuccess, (state, action) => {
    return { ...state, isLoading: false, cartUpdated: action.cart }
  }),
  on(updateCartFailure, (state) => {
    return { ...state, isLoading: false }
  }),
  on(clearUpdatedCart, (state) => {
    return { ...state, cartUpdated: null }
  }),
)
