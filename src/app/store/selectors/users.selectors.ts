import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UsersStore } from '../models/users.store.model';

export const selectUsersState = createFeatureSelector<UsersStore>('users');
export const selectUsers = createSelector(selectUsersState, (state) => state.users);
export const selectUser = createSelector(selectUsersState, (state) => state.user);
export const selectUsersIsLoading = createSelector(selectUsersState, (state) => state.isLoading);
export const selectNewUserId = createSelector(selectUsersState, (state) => state.newUserId);
