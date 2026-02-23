import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Cart } from '../../models/cart.model';
import { NewCartRequest } from '../../models/requests/new-cart.request.model';
import { NewCartResponse } from '../../models/responses/new-cart.response';

@Injectable({ providedIn: 'root'})
export class CartService {
  private httpClient = inject(HttpClient);

  listCarts(): Observable<Cart[]> {
    return this.httpClient.get<Cart[]>('carts');
  }

  getCart(cartId: number): Observable<Cart> {
    return this.httpClient.get<Cart>(`carts/${cartId}`);
  }

  addCart(request: NewCartRequest): Observable<NewCartResponse> {
    return this.httpClient.post<NewCartResponse>(
      'carts',
      request
    )
  }

  updateCart(cartId: number, request: NewCartRequest): Observable<NewCartResponse> {
    return this.httpClient.put<NewCartResponse>(
      `carts/${cartId}`,
      request
    )
  }
}
