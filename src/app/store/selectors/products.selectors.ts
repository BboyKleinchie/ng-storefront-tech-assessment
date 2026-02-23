import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductsStore } from '../models/products.store.model';

export const selectProductsState = createFeatureSelector<ProductsStore>('products');
export const selectProducts = createSelector(selectProductsState, (state) => state.products);
export const selectProductsIsLoading = createSelector(selectProductsState, (state) => state.isLoading);
export const selectProductDetails = createSelector(selectProductsState, (state) => state.productDetails);
