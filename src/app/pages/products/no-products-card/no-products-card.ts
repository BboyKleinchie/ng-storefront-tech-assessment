import { Component, input } from '@angular/core';
import { CardComponent } from '../../../components/card/card';

@Component({
  selector: 'storefront-no-products-card',
  imports: [CardComponent],
  templateUrl: './no-products-card.html',
  styleUrl: './no-products-card.scss',
})
export class NoProductsCardComponent {
  title = input.required<string>();
  description = input.required<string>();

}
