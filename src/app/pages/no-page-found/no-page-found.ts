import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { CardComponent } from '../../components/card/card';

@Component({
  selector: 'storefront-no-page-found',
  imports: [CardComponent],
  templateUrl: './no-page-found.html',
  styleUrl: './no-page-found.scss',
})
export class NoPageFoundPage {
  private router = inject(Router);

  goHome() { this.router.navigate(['/'])};
}
