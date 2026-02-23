import { Component, inject, input, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';

import { CardComponent } from '../../../components/card/card';
import { RatingComponent } from '../../products/rating/rating';

import { Product } from '../../../models/product.model';
import { InfoModalComponent } from '../../../components/modal/info-modal/info-modal';

@Component({
  selector: 'storefront-cart-card',
  imports: [
    CardComponent,
    InfoModalComponent,
    RatingComponent,
    CurrencyPipe
  ],
  templateUrl: './cart-card.html',
  styleUrl: './cart-card.scss'
})
export class CartCardComponent {
  product = input.required<Product | null>();

  showInfoModal = signal<boolean>(false);

  private router = inject(Router);

  proceedToCheckout() { this.showInfoModal.set(true); }

  goHome() { this.router.navigate(['/']); }
}
