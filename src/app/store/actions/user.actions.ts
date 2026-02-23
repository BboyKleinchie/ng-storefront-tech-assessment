import { createAction, props } from '@ngrx/store'

import { User } from '../../models/user.model'
import { NewUserRequest } from '../../models/requests/new-user.request.model';

export const getUsers = createAction('[User] Get users');
export const getUsersSuccess = createAction('[User] Get users success', props<{users: User[]}>());
export const getUsersFailure = createAction('[User] Get users failure', props<{errorMessage: string}>());
export const getUser = createAction('[User] Get user', props<{userId: number}>());
export const getUserSuccess = createAction('[User] Get users success', props<{user: User}>());
export const getUserFailure = createAction('[User] Get users failure', props<{errorMessage: string}>());
export const registerUser = createAction('[User] Register user', props<{request: NewUserRequest}>());
export const registerUserSuccess = createAction('[User] Register user success', props<{userId: number}>());
export const registerUserFailure = createAction('[User] Register user failure', props<{errorMessage: string}>());
