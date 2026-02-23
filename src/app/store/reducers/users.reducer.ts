import { createReducer, on } from '@ngrx/store';

import { User } from '../../models/user.model';
import { UsersStore } from '../models/users.store.model';
import {
  getUser,
  getUserFailure,
  getUsers,
  getUsersFailure,
  getUsersSuccess,
  getUserSuccess,
  registerUser,
  registerUserFailure,
  registerUserSuccess
} from '../actions/user.actions';

const initialState: UsersStore = {
  isLoading: false,
  users: [] as User[],
  newUserId: null,
  user: null
}

export const usersReducer = createReducer(
  initialState,
  on(getUsers, (state) => {
    return { ...state, isLoading: true }
  }),
  on(getUsersSuccess, (state, action) => {
    return {
      ...state,
      isLoading: false,
      users: action.users
    }
  }),
  on(getUsersFailure, (state) => {
    return { ...state, isLoading: false }
  }),
  on(getUser, (state) => {
    return { ...state, isLoading: true }
  }),
  on(getUserSuccess, (state, action) => {
    return {
      ...state,
      isLoading: false,
      user: action.user
    }
  }),
  on(getUserFailure, (state) => {
    return { ...state, isLoading: false }
  }),
  on(registerUser, (state) => {
    return { ...state, isLoading: true }
  }),
  on(registerUserSuccess, (state, action) => {
    return {
      ...state,
      isLoading: false,
      newUserId: action.userId
    }
  }),
  on(registerUserFailure, (state) => {
    return { ...state, isLoading: false }
  })
)
