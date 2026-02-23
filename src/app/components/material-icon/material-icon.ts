import { Component, input } from '@angular/core';

@Component({
  selector: 'storefront-material-icon',
  imports: [],
  templateUrl: './material-icon.html',
  styleUrl: './material-icon.scss',
})
export class MaterialIconComponent {
  name = input.required<string>();
  useSymbols = input<boolean>(false);
}
