import { createAction, props } from '@ngrx/store';

export const setErrorMessage = createAction('[Errors] Set error message', props<{errorMessage: string}>());
