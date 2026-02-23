import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

import { ProductsService } from '../../services/products/products';
import { getProductDetails, getProductDetailsFailure, getProductDetailsSuccess, getProducts, getProductsFailure, getProductsSuccess } from '../actions/products.actions';

@Injectable()
export class ProductsEffects {
  private actions$ = inject(Actions);
  private productsService = inject(ProductsService);

  getProducts$ = createEffect(() =>
      this.actions$.pipe(
      ofType(getProducts),
      switchMap(() =>
        this.productsService
            .listProducts()
            .pipe(
              map(products => getProductsSuccess({products})),
              catchError(() => of(getProductsFailure({errorMessage: "Error loading products. Please try again later."})))
            )
      )
    )
  );

  getProductDetails$ = createEffect(() =>
      this.actions$.pipe(
      ofType(getProductDetails),
      switchMap((action) =>
        this.productsService
            .getProductDetails(action.productId)
            .pipe(
              map(product => getProductDetailsSuccess({product})),
              catchError(() =>
                of(getProductDetailsFailure({errorMessage: "Error retrieving product details. Please try again later."}))
              )
            )
      )
    )
  );
}
