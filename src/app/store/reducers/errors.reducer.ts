import { createReducer, on } from '@ngrx/store';

import { setErrorMessage } from './../actions/errors.actions';
import { ErrorsStore } from '../models/errors.store.model';

const initialState: ErrorsStore = {
  errorMessage: null
}

export const errorsReducer = createReducer(
  initialState,
  on(setErrorMessage, (state, action) => {
    return {
      ...state,
      errorMessage: action.errorMessage
    }
  })
)
