import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { createReducer, provideStore } from '@ngrx/store';

import { routes } from './app.routes';

import { apiInterceptor } from './interceptors/api.interceptor';
import { headersInterceptor } from './interceptors/headers.interceptor';

import { authReducer } from './store/reducers/auth.reducer';
import { cartReducer } from './store/reducers/cart.reducer';
import { errorsReducer } from './store/reducers/errors.reducer';
import { productsReducer } from './store/reducers/products.reducer';
import { usersReducer } from './store/reducers/users.reducer';

import { AuthEffects } from './store/effects/auth.effects';
import { CartEffects } from './store/effects/cart.effects';
import { ErrorEffects } from './store/effects/error.effects';
import { ProductsEffects } from './store/effects/products.effects';
import { UserEffects } from './store/effects/user.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withInterceptors([
        apiInterceptor,
        headersInterceptor
    ])),
    provideRouter(routes, withComponentInputBinding()),
    provideStore({
      auth: authReducer,
      cart: cartReducer,
      errors: errorsReducer,
      products: productsReducer,
      users: usersReducer
    }),
    provideEffects([
      AuthEffects,
      CartEffects,
      ErrorEffects,
      ProductsEffects,
      UserEffects
    ])
]
};
