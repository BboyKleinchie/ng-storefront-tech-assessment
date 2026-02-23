import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ErrorsStore } from '../models/errors.store.model';

export const selectErrorsState = createFeatureSelector<ErrorsStore>('errors');
export const selectErrors = createSelector(selectErrorsState, (state) => state.errorMessage);
