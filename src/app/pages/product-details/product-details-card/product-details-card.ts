import { Component, computed, inject, input, signal, DestroyRef } from '@angular/core';
import { Router } from '@angular/router';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { get } from 'lodash-es';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CardComponent } from '../../../components/card/card';
import { InfoModalComponent } from '../../../components/modal/info-modal/info-modal';
import { LoadingSpinnerComponent } from '../../../components/loading-spinner/loading-spinner';
import { NumberPickerComponent } from '../../../components/number-picker/number-picker';
import { RatingComponent } from '../../products/rating/rating';

import { Product } from '../../../models/product.model';
import { selectAuthIsLoading, selectAuthToken } from '../../../store/selectors/auth.selectors';
import { getUser } from '../../../store/actions/user.actions';

import { isCollectionNullOrEmpty, isPropertyNull, isStringNullOrEmpty } from '../../../utils/isEmptyChecks.utils';
import { parseJWT } from '../../../utils/security.utils';
import { Cart } from '../../../models/cart.model';
import { selectCartAdded, selectCartIsLoading, selectCarts, selectCartUpdated } from '../../../store/selectors/cart.selectors';
import { NewCartRequest } from '../../../models/requests/new-cart.request.model';
import { addCart, clearAddedCart, clearUpdatedCart, updateCart } from '../../../store/actions/cart.actions';
import { selectUsersIsLoading } from '../../../store/selectors/users.selectors';

@Component({
  selector: 'storefront-product-details-card',
  imports: [
    CardComponent,
    LoadingSpinnerComponent,
    NumberPickerComponent,
    RatingComponent,
    InfoModalComponent,
    AsyncPipe,
    CurrencyPipe
  ],
  templateUrl: './product-details-card.html',
  styleUrl: './product-details-card.scss'
})
export class ProductDetailsCardComponent {
  productDetails = input.required<Product | null>();

  hasProductDetails = computed(() => !isCollectionNullOrEmpty(this.productDetails()));
  quantity = signal<number>(1);
  showInfoModal = signal<boolean>(false);
  cart = signal<Cart | null>(null);
  userId = signal<number | null>(null);

  isLoading$: Observable<boolean>;

  private authToken: string | null = '';

  private router = inject(Router);
  private store = inject(Store);
  private destroyRef = inject(DestroyRef);

  constructor() {
    this.isLoading$ = combineLatest([
                        this.store.select(selectUsersIsLoading),
                        this.store.select(selectAuthIsLoading),
                        this.store.select(selectCartIsLoading),
                      ])
                      .pipe(
                        map(([usersIsLoading, authIsLoading, cartIsLoading]) =>
                          usersIsLoading || authIsLoading || cartIsLoading
                        )
                      );

    const authSubscription = (
      this.store
          .select(selectAuthToken)
          .subscribe((token) => {
            this.authToken = token;
            if(isStringNullOrEmpty(token ?? '')) return;

            const userDetails = parseJWT(token!);
            const userId: number = get(userDetails, 'sub', -1);

            if(userId === -1) return;

            this.store.dispatch(getUser({userId}));
            this.userId.set(userId);

            this.store
                .select(selectCarts)
                .subscribe((carts) => {
                  const cart = carts.find(c => c.userId === userId);
                  if (isCollectionNullOrEmpty(cart)) return;

                  this.cart.set(cart ?? null);
                })
          })
    );
    const cartAddedSubscription = (
      this.store
          .select(selectCartAdded)
          .subscribe((cart) => {
            if (isCollectionNullOrEmpty(cart)) return;

            this.store.dispatch(clearAddedCart());
            this.router.navigate(['cart']);
          })
    );
    const cartUpdatedSubscription = (
      this.store
          .select(selectCartUpdated)
          .subscribe((cart) => {
            if (isCollectionNullOrEmpty(cart)) return;

            this.store.dispatch(clearUpdatedCart());
            this.router.navigate(['cart']);
          })
    );

    this.destroyRef.onDestroy(() => {
      authSubscription?.unsubscribe();
      cartAddedSubscription?.unsubscribe();
      cartUpdatedSubscription?.unsubscribe();
    });
  }

  addProductToCart() {
    if (isStringNullOrEmpty(this.authToken ?? '')) {
      this.showInfoModal.set(true);
      return;
    }

    const cartId = this.cart()?.id;
    const request: NewCartRequest = {
        id: cartId ?? Math.floor(Math.random() * 1_000_000) + 1,
        userId: this.userId()!,
        products: [{
          id: this.productDetails()!.id,
          title: this.productDetails()!.title,
          price: this.productDetails()!.price,
          description: this.productDetails()!.description,
          category: this.productDetails()!.category,
          quantity: this.quantity()
        }]
      }

    if (isPropertyNull(cartId)) {
      this.store.dispatch(addCart({request}));

      return;
    }

    this.store.dispatch(updateCart({cartId: cartId!, request}));
  }

  goHome() { this.router.navigate(['/']); }
}
