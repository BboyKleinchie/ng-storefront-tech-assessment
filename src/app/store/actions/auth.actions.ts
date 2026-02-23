import { createAction, props } from '@ngrx/store';
import { AuthRequest } from './../../models/requests/auth.request.model';

export const authenticateUser = createAction('[Auth] Authenticate user', props<{request: AuthRequest}>());
export const authenticateUserSuccess = createAction(
  '[Auth] Authenticate user success',
  props<{token: string}>()
);
export const authenticateUserFailure = createAction(
  '[Auth] Authenticate user failure',
  props<{errorMessage: string}>()
);

export const logoutUser = createAction('[Auth] Logout user');
