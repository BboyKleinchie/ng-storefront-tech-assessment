import { Component, computed, inject, input, signal, DestroyRef, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner';
import { NoProductsCardComponent } from '../products/no-products-card/no-products-card';
import { ProductDetailsCardComponent } from './product-details-card/product-details-card';

import { selectProductDetails, selectProductsIsLoading } from './../../store/selectors/products.selectors';
import { ProductsStore } from './../../store/models/products.store.model';
import { getProductDetails } from '../../store/actions/products.actions';

import { Product } from '../../models/product.model';
import { isCollectionNullOrEmpty } from '../../utils/isEmptyChecks.utils';

@Component({
  selector: 'storefront-product-details',
  imports: [
    LoadingSpinnerComponent,
    NoProductsCardComponent,
    ProductDetailsCardComponent,
    AsyncPipe
],
  templateUrl: './product-details.html',
  styleUrl: './product-details.scss',
})
export class ProductDetailsPage implements OnInit {
  productId = input.required<number>();

  isLoading$: Observable<boolean>;
  productDetails = signal<Product | null>(null);

  hasProductDetails = computed(() => !(isCollectionNullOrEmpty(this.productDetails())) );

  private store = inject(Store<ProductsStore>);
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);

  constructor() {
    this.isLoading$ = this.store.select(selectProductsIsLoading);

    const subscription = (
      this.store
        .select(selectProductDetails)
        .subscribe((productDetails) => {
          if (isCollectionNullOrEmpty(productDetails)) {
            this.productDetails.set(null);
            return;
          }

          this.productDetails.set(productDetails);
        })
    );

    this.destroyRef.onDestroy(() => subscription?.unsubscribe());

  }

  ngOnInit(): void {
    this.store.dispatch(getProductDetails({productId: this.productId()}));
  }

  goHome() {
    this.router.navigate(['/']);
  }
}
