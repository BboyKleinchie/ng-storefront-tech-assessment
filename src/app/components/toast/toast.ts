import { NgTemplateOutlet } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NgbToast } from '@ng-bootstrap/ng-bootstrap/toast';

import { ToastService } from '../../services/toast/toast';

@Component({
  selector: 'storefront-toast',
  imports: [
    NgbToast,
    NgTemplateOutlet
  ],
  templateUrl: './toast.html',
  styleUrl: './toast.scss',
	host: { class: 'toast-container position-fixed top-0 end-0 p-3', style: 'z-index: 1200'}
})
export class ToastComponent {
  readonly toastService = inject(ToastService);

}
