import { createReducer, on } from '@ngrx/store';
import { AuthStore } from '../models/auth.store.model';
import { authenticateUser, authenticateUserFailure, authenticateUserSuccess, logoutUser } from '../actions/auth.actions';

const initialState: AuthStore = {
  isLoading: false,
  token: null,
  error: ''
}

export const authReducer = createReducer(
  initialState,
  on(authenticateUser, (state) => { return {...state, isLoading: true }} ),
  on(authenticateUserSuccess, (state, action) => {
    return {
      ...state,
      isLoading: false,
      token: action.token,
      error: null
    }
  }),
  on(authenticateUserFailure, (state, action) => {
    return {
      ...state,
      isLoading: false,
      error: action.errorMessage
    }}
  ),
  on(logoutUser, (state) => {
    return {
      ...state,
      isLoading: false,
      error: null,
      token: null
    }
  })
)
