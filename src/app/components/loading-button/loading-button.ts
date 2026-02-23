import { Component, input, ViewEncapsulation } from '@angular/core';

import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner';

@Component({
  selector: 'storefront-loading-button',
  imports: [
    LoadingSpinnerComponent
  ],
  templateUrl: './loading-button.html',
  styleUrl: './loading-button.scss',
  encapsulation: ViewEncapsulation.None
})
export class LoadingButtonComponent {
  isLoading = input.required<boolean | null>();

}
