import { Component, computed, inject, OnDestroy, output, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { takeUntil } from 'rxjs';

import { Unsubscriber } from '../../../abstract/unsubscriber';
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
export class ErrorModalComponent extends Unsubscriber implements OnDestroy {
  dismiss = output<void>();

  errorMessage = signal<string>('');
  hasErrorMessage = computed(() => !isStringNullOrEmpty(this.errorMessage()));

  constructor(store: Store<ErrorsStore>) {
    super();

    store.select(selectErrors)
         .pipe(takeUntil(this.destroyed$))
         .subscribe((errorMessage) => this.errorMessage.set(errorMessage ?? ''));
  }

}
