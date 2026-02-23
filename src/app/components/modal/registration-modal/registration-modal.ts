import { AsyncPipe } from '@angular/common';
import { Component, DestroyRef, inject, input, output, signal, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap/modal';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { FormFieldComponent } from '../../form-field/form-field';
import { LoadingButtonComponent } from '../../loading-button/loading-button';
import { ModalComponent } from '../modal';
import { PasswordInputComponent } from '../../password-input/password-input';

import { selectNewUserId, selectUsersIsLoading } from '../../../store/selectors/users.selectors';
import { registerUser } from '../../../store/actions/user.actions';
import { UsersStore } from '../../../store/models/users.store.model';

import { NewUserRequest } from '../../../models/requests/new-user.request.model';

import { ToastService } from '../../../services/toast/toast';
import { isNumberNullOrZero } from '../../../utils/isEmptyChecks.utils';

@Component({
  selector: 'storefront-registration-modal',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    FormFieldComponent,
    LoadingButtonComponent,
    ModalComponent,
    PasswordInputComponent,
    AsyncPipe
  ],
  templateUrl: './registration-modal.html',
  styleUrl: './registration-modal.scss',
})
export class RegistrationModalComponent {
  showModal = input.required<boolean>();
  dismiss = output<void>();
  loginClick = output<void>();

  registrationForm: FormGroup;
  isLoading$: Observable<boolean>;
  isPasswordVisible = signal<boolean>(false);

  @ViewChild('toastSuccess')
  private toastSuccessTemplate!: TemplateRef<any>;

  private modalRef?: NgbModalRef;

  private destroyRef = inject(DestroyRef);
  private formBuilder = inject(FormBuilder);
  private store = inject(Store<UsersStore>);
  private toastService = inject(ToastService);

  constructor() {
    this.registrationForm = this.createRegistrationForm();
    this.isLoading$ = this.store.select(selectUsersIsLoading);
  }

  storeModalReference(modalReference: NgbModalRef) { this.modalRef = modalReference; }

  onDismiss() {
    this.dismiss.emit();
    this.registrationForm.reset();
  }

  onLogin() {
    this.modalRef?.close();
    this.loginClick.emit();
  }

  onRegister(event: any) {
    event?.preventDefault();
    this.registrationForm.markAllAsTouched();

    if (!this.registrationForm.valid) return;

    const request: NewUserRequest = {
      id: Math.floor(Math.random() * 1_000_000) + 1,
      email: this.registrationForm.get('email')?.value,
      username: this.registrationForm.get('username')?.value,
      password: this.registrationForm.get('password')?.value
    }

    this.store.dispatch(registerUser({request}));

    const subscription = (
      this.store
          .select(selectNewUserId)
          .subscribe((userId) => {
            if (isNumberNullOrZero(userId ?? 0)) return;

            this.toastService.show({ template: this.toastSuccessTemplate, classname: 'bg-success text-light', delay: 5000 });
            this.onDismiss();
            this.modalRef?.close();
            subscription?.unsubscribe();
          })
    );

    this.destroyRef.onDestroy(() => {
      subscription?.unsubscribe();
    })
  }

  private createRegistrationForm(): FormGroup {
    return this.formBuilder.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }
}
