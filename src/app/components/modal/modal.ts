import { Component, computed, effect, inject, input, output, TemplateRef, ViewChild } from '@angular/core';

import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap/modal';
import { isStringNullOrEmpty } from '../../utils/isEmptyChecks.utils';

@Component({
  selector: 'storefront-modal',
  imports: [],
  templateUrl: './modal.html',
  styleUrl: './modal.scss',
})
export class ModalComponent {
  title = input<string>('');
  primaryAction = input<string>('');
  secondaryAction = input<string>('Close');
  shouldShowDismissAction = input<boolean>(false);
  shouldShowFooter = input<boolean>(false);
  showModal = input<boolean>(false);
  primaryActionClicked = output<void>();
  dismiss = output<void>();
  modalRef = output<NgbModalRef>();

  private modalService = inject(NgbModal);

  hasTitle = computed(() => !isStringNullOrEmpty(this.title()));
  hasCallToActions = computed(() => this.shouldShowFooter() || !isStringNullOrEmpty(this.primaryAction()) || this.shouldShowDismissAction());
  shouldShowPrimaryAction = computed(() => !isStringNullOrEmpty(this.primaryAction()));

  @ViewChild('modal')
  private modalTemplate!: TemplateRef<any>;

  constructor() {
    effect(() => {
      if (this.showModal()) this.open();
    })
  }

  open() {
    const modalReference = (
      this.modalService
          .open(
            this.modalTemplate, {
              ariaLabelledBy: 'modal-basic-title',
              centered: true
            })
    );
    this.modalRef.emit(modalReference);
  }
}
