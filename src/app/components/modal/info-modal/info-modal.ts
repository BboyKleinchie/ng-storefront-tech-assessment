import { Component, input, output } from '@angular/core';

import { ModalComponent } from '../modal';
import { MaterialIconComponent } from "../../material-icon/material-icon";

@Component({
  selector: 'storefront-info-modal',
  imports: [
    ModalComponent,
    MaterialIconComponent
  ],
  templateUrl: './info-modal.html',
  styleUrl: './info-modal.scss',
})
export class InfoModalComponent {
  message = input.required<string>();
  showModal = input<boolean>(false);
  dismiss = output<void>();

}
