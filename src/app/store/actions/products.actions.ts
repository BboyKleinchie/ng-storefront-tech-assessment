import { Product } from './../../models/product.model';
import { createAction, props } from '@ngrx/store';

export const getProducts = createAction('[Products] Get products');
export const getProductsSuccess = createAction('[Products] Get products success', props<{products: Product[]}>());
export const getProductsFailure = createAction('[Products] Get products failure', props<{errorMessage: string}>());

export const getProductDetails = createAction('[Products] Get product details', props<{productId: number}>());
export const getProductDetailsSuccess = createAction(
  '[Products] Get product details success',
  props<{product: Product}>()
);
export const getProductDetailsFailure = createAction(
  '[Products] Get product details failure',
  props<{errorMessage: string}>()
);
