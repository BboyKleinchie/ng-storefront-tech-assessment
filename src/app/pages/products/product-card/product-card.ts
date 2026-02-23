import { Component, input, output } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

import { VerticalCardComponent } from '../../../components/vertical-card/vertical-card';
import { RatingComponent } from '../rating/rating';

import { Product } from '../../../models/product.model';

@Component({
  selector: 'storefront-product-card',
  imports: [
    RatingComponent,
    VerticalCardComponent,
    CurrencyPipe
],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCardComponent {
  product = input.required<Product>();
  selected = output<Product>();
}
