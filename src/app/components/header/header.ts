import { Component, inject, signal, ViewChild, TemplateRef, OnDestroy } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { takeUntil } from 'rxjs';

import { Unsubscriber } from '../../abstract/unsubscriber';

import { LinkListComponent } from '../link-list/link-list';
import { LoginModalComponent } from '../modal/login-modal/login-modal';
import { MaterialIconComponent } from '../material-icon/material-icon';
import { RegistrationModalComponent } from '../modal/registration-modal/registration-modal';

import { AuthStore } from './../../store/models/auth.store.model';
import { logoutUser } from '../../store/actions/auth.actions';
import { selectAuthToken } from '../../store/selectors/auth.selectors';

import { ToastService } from '../../services/toast/toast';
import { isStringNullOrEmpty } from '../../utils/isEmptyChecks.utils';

@Component({
  selector: 'storefront-header',
  imports: [
    LinkListComponent,
    LoginModalComponent,
    MaterialIconComponent,
    RegistrationModalComponent,
    RouterLink
],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class HeaderComponent extends Unsubscriber implements OnDestroy {
  showLoginModal = signal<boolean>(false);
  showRegistrationModal = signal<boolean>(false);
  isLoggedIn = signal<boolean>(false);

  @ViewChild('toastSuccess')
  private toastSuccessTemplate!: TemplateRef<any>;

  private store = inject(Store<AuthStore>);
  private toastService = inject(ToastService);
  private router = inject(Router);

  constructor() {
    super();

    this.store
        .select(selectAuthToken)
        .pipe(takeUntil(this.destroyed$))
        .subscribe((token) => {
          if (isStringNullOrEmpty(token ?? '')) {
            this.isLoggedIn.set(false);
            return
          };

          this.isLoggedIn.set(true);
        });
  }

  onLogin() { this.showLoginModal.set(true); }
  onLoginModalClose() { this.showLoginModal.set(false); }

  onLogout() {
    this.store.dispatch(logoutUser());
    this.toastService.show({ template: this.toastSuccessTemplate, classname: 'bg-success text-light', delay: 4000 });
    this.router.navigate(['/']);
  }

  onRegister() { this.showRegistrationModal.set(true); }
  onRegisterModalClose() { this.showRegistrationModal.set(false); }

  onViewCart() {
    this.router.navigate(['cart']);
  }
}
