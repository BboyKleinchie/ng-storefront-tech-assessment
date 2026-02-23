import { getProductDetails, getProductDetailsFailure, getProductDetailsSuccess, getProducts, getProductsFailure, getProductsSuccess} from './../actions/products.actions';
import { createReducer, on } from '@ngrx/store';

import { Product } from './../../models/product.model';
import { ProductsStore } from '../models/products.store.model';

const initialState: ProductsStore = {
  isLoading: false,
  products: [] as Product[],
  productDetails: null
}

export const productsReducer = createReducer(initialState,
  on(getProducts, (state) => {
    return {...state, isLoading: true}
  }),
  on(getProductsSuccess, (state, action) => {
    return {...state, products: action.products, isLoading: false}
  }),
  on(getProductsFailure, (state) => {
    return {...state, isLoading: false}
  }),
  on(getProductDetails, (state) => {
    return {...state, isLoading: true}
  }),
  on(getProductDetailsSuccess, (state, action) => {
    return {...state, productDetails: action.product, isLoading: false}
  }),
  on(getProductDetailsFailure, (state) => {
    return {...state, isLoading: false}
  })
);
