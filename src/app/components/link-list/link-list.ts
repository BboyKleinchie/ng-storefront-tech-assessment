import { Component, input } from '@angular/core';

@Component({
  selector: 'storefront-link-list',
  imports: [],
  templateUrl: './link-list.html',
  styleUrl: './link-list.scss',
})
export class LinkListComponent {
  label = input.required<string>();
}
