import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MaterialIconComponent } from '../material-icon/material-icon';

@Component({
  selector: 'storefront-search-bar',
  imports: [
    FormsModule,
    MaterialIconComponent
  ],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.scss',
})
export class SearchBarComponent {
  placeholder = input<string>();
  search = output<string>();
}
