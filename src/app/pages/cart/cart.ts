import { Component, inject, DestroyRef, signal, computed } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { combineLatest, map, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { get } from 'lodash-es';

import { CartCardComponent } from './cart-card/cart-card';
import { EmptyCartCardComponent } from './empty-cart-card/empty-cart-card';
import { LoadingSpinnerComponent } from "../../components/loading-spinner/loading-spinner";

import { Cart } from './../../models/cart.model';
import { Product } from '../../models/product.model';

import { selectAuthIsLoading, selectAuthToken } from '../../store/selectors/auth.selectors';
import { selectCart, selectCartIsLoading, selectCarts } from '../../store/selectors/cart.selectors';
import { selectProducts, selectProductsIsLoading } from '../../store/selectors/products.selectors';
import { getCart } from '../../store/actions/cart.actions';
import { getProducts } from '../../store/actions/products.actions';

import { isArrayNullOrEmpty, isCollectionNullOrEmpty, isStringNullOrEmpty } from '../../utils/isEmptyChecks.utils';
import { parseJWT } from '../../utils/security.utils';

@Component({
  selector: 'storefront-cart',
  imports: [
    CartCardComponent,
    EmptyCartCardComponent,
    LoadingSpinnerComponent,
    AsyncPipe,
],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class CartPage {
  isLoading$: Observable<boolean>;

  hasCartProducts = computed(() => !isArrayNullOrEmpty(this.cart()?.products??[]));
  products = signal<Product[]>([]);

  private cart = signal<Cart | null>(null);
  private userId = signal<number | null>(null);

  private store = inject(Store);
  private destroyRef = inject(DestroyRef);

  constructor() {
    this.isLoading$ = combineLatest([
                        this.store.select(selectAuthIsLoading),
                        this.store.select(selectCartIsLoading),
                        this.store.select(selectProductsIsLoading)
                      ])
                      .pipe(
                        map(([authIsLoading, cartIsLoading, productsIsLoading]) =>
                          authIsLoading || cartIsLoading || productsIsLoading
                        )
                      );

    const authSubscription = (
      this.store
          .select(selectAuthToken)
          .subscribe((token) => {
            if(isStringNullOrEmpty(token ?? '')) return;

            const userDetails = parseJWT(token!);
            const userId: number = get(userDetails, 'sub', -1);

            if(userId === -1) return;

            this.userId.set(userId);

            this.store
                .select(selectCarts)
                .subscribe((carts) => {
                  const cart = carts.find(c => c.userId === userId);
                  if (isCollectionNullOrEmpty(cart)) return;

                  this.store.dispatch(getCart({cartId: cart!.id}));
                })
          })
    );
    const cartSubscription = (
      this.store
          .select(selectCart)
          .subscribe((cart) => {
            this.cart.set(cart ?? null);

            if (isCollectionNullOrEmpty(cart)) return;

            this.store
                .select(selectProducts)
                .subscribe((products) => {
                  if (isArrayNullOrEmpty(products)) {
                    this.store.dispatch(getProducts());
                    return;
                  }

                  const cartProductIds = this.cart()?.products.map(p => p.productId)??[];
                  this.products.set(
                    [
                      ...products.filter((product) => {
                        return cartProductIds.includes(product.id);
                      })
                    ]
                  );

                })
          })
    );

    this.destroyRef.onDestroy(() => {
      authSubscription?.unsubscribe();
      cartSubscription?.unsubscribe();
    });
  }
}
