import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { CardComponent } from '../../../components/card/card';

@Component({
  selector: 'storefront-empty-cart-card',
  imports: [
    CardComponent
  ],
  templateUrl: './empty-cart-card.html',
  styleUrl: './empty-cart-card.scss',
})
export class EmptyCartCardComponent {
  private router = inject(Router);

  onLogin() {

  }

  goHome() { this.router.navigate(['/']); }
}
