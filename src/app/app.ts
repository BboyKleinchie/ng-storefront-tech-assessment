import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';

import { ErrorModalComponent } from './components/modal/error-modal/error-modal';
import { FooterComponent } from './components/footer/footer';
import { HeaderComponent } from './components/header/header';
import { ToastComponent } from './components/toast/toast';

import { getUsers } from './store/actions/user.actions';
import { listCarts } from './store/actions/cart.actions';
import { setErrorMessage } from './store/actions/errors.actions';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    ErrorModalComponent,
    FooterComponent,
    HeaderComponent,
    ToastComponent
],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  private store = inject(Store);

  ngOnInit(): void {
    // hydrate the stores
    this.store.dispatch(getUsers());
    this.store.dispatch(listCarts());
  }

  onErrorModalClose() {
    this.store.dispatch(setErrorMessage({errorMessage: ''}));
  }
}
