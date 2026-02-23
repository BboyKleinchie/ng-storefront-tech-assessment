import { Component } from '@angular/core';

import { currentYear } from '../../utils/date.utils';
import { LinkListComponent } from '../link-list/link-list';

@Component({
  selector: 'storefront-footer',
  imports: [LinkListComponent],
  templateUrl: './footer.html',
  styleUrl: './footer.scss'
})
export class FooterComponent {
  year = currentYear();
}
