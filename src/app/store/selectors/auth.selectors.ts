import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthStore } from '../models/auth.store.model';

export const selectAuthState = createFeatureSelector<AuthStore>('auth');
export const selectAuthToken = createSelector(selectAuthState, (state) => state.token);
export const selectAuthIsLoading = createSelector(selectAuthState, (state) => state.isLoading);
export const selectAuthError = createSelector(selectAuthState, (state) => state.error);
