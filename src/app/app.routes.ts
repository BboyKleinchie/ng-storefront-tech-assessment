import { Routes } from '@angular/router';

import { CartPage } from './pages/cart/cart';
import { ProductsPage } from './pages/products/products';
import { NoPageFoundPage } from './pages/no-page-found/no-page-found';
import { ProductDetailsPage } from './pages/product-details/product-details';

export const routes: Routes = [
  {
    path: '',
    component: ProductsPage
  },
  {
    path: 'product/:productId',
    component: ProductDetailsPage
  },
  {
    path: 'cart',
    component: CartPage
  },
  {
    path: '**',
    component: NoPageFoundPage
  }
];
