import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { Product } from '../../models/product.model';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ProductsService {
  private httpClient = inject(HttpClient);

  listProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>('products');
  }

  getProductDetails(productId: number): Observable<Product> {
    return this.httpClient.get<Product>(`products/${productId.toString()}`);
  }
}
