import { AsyncPipe } from '@angular/common';
import { Component, DestroyRef, inject, input, output, signal, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap/modal';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { FormFieldComponent } from '../../form-field/form-field';
import { LoadingButtonComponent } from "../../loading-button/loading-button";
import { ModalComponent } from '../modal';
import { PasswordInputComponent } from '../../password-input/password-input';

import { AuthRequest } from '../../../models/requests/auth.request.model';

import { selectAuthIsLoading, selectAuthToken } from '../../../store/selectors/auth.selectors';
import { AuthStore } from '../../../store/models/auth.store.model';
import { authenticateUser } from '../../../store/actions/auth.actions';
import { ToastService } from '../../../services/toast/toast';

import { isStringNullOrEmpty } from './../../../utils/isEmptyChecks.utils';

@Component({
  selector: 'storefront-login-modal',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    FormFieldComponent,
    LoadingButtonComponent,
    ModalComponent,
    PasswordInputComponent,
    AsyncPipe
],
  templateUrl: './login-modal.html',
  styleUrl: './login-modal.scss',
})
export class LoginModalComponent {
  showModal = input.required<boolean>();
  dismiss = output<void>();
  registrationClick = output<void>();

  loginForm: FormGroup;
  isLoading$: Observable<boolean>;
  isPasswordVisible = signal<boolean>(false);

  @ViewChild('toastSuccess')
  private toastSuccessTemplate!: TemplateRef<any>;

  private modalRef?: NgbModalRef;

  private destroyRef = inject(DestroyRef);
  private formBuilder = inject(FormBuilder);
  private store = inject(Store<AuthStore>);
  private toastService = inject(ToastService);

  constructor() {
    this.loginForm = this.createLoginForm();
    this.isLoading$ = this.store.select(selectAuthIsLoading);
  }

  onDismiss() {
    this.dismiss.emit();
    this.loginForm.reset();
  }

  onLogin(event: any) {
    event?.preventDefault();
    this.loginForm.markAllAsTouched();

    if (!this.loginForm.valid) return;

    const request: AuthRequest = {
      username: this.loginForm.get('username')?.value,
      password: this.loginForm.get('password')?.value
    }

    this.store.dispatch(authenticateUser({request}));

    const tokenSubscription = (
      this.store
          .select(selectAuthToken)
          .subscribe((token) => {
            if (isStringNullOrEmpty(token ?? '')) return;

            this.showSuccessToast();
            this.onDismiss();
            this.modalRef?.close();
            tokenSubscription?.unsubscribe();
          })
    );

    this.destroyRef.onDestroy(() => {
      tokenSubscription?.unsubscribe();
    })
  }

  onRegister() {
    this.modalRef?.close();
    this.registrationClick.emit();
  }

  showSuccessToast() {
		this.toastService.show({ template: this.toastSuccessTemplate, classname: 'bg-success text-light', delay: 4000 });
	}

  storeModalReference(modalReference: NgbModalRef) { this.modalRef = modalReference; }

  togglePasswordVisibility(event: any) {
    event?.preventDefault();
    this.isPasswordVisible.set(!this.isPasswordVisible());
  }

  private createLoginForm(): FormGroup {
    return this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

}
