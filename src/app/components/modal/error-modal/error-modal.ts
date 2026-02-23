import { Component, computed, DestroyRef, inject, output, signal } from '@angular/core';
import { Store } from '@ngrx/store';

import { ErrorsStore } from './../../../store/models/errors.store.model';

import { ModalComponent } from '../modal';
import { MaterialIconComponent } from "../../material-icon/material-icon";

import { selectErrors } from '../../../store/selectors/errors.selectors';
import { isStringNullOrEmpty } from '../../../utils/isEmptyChecks.utils';

@Component({
  selector: 'storefront-error-modal',
  imports: [
    ModalComponent,
    MaterialIconComponent
  ],
  templateUrl: './error-modal.html',
  styleUrl: './error-modal.scss',
})
export class ErrorModalComponent {
  dismiss = output<void>();

  errorMessage = signal<string>('');
  hasErrorMessage = computed(() => !isStringNullOrEmpty(this.errorMessage()));

  private destroyRef = inject(DestroyRef);

  constructor(store: Store<ErrorsStore>) {
    const subscription = store.select(selectErrors)
                              .subscribe((errorMessage) => {
                                this.errorMessage.set(errorMessage ?? '')
                              });

    this.destroyRef.onDestroy(() => { subscription.unsubscribe(); });
  }

}
