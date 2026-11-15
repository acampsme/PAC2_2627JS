import { createAction, props } from '@ngrx/store';
import { AuthDTO } from '../../Models/auth.dto';

export const loginStarted = createAction('[Auth] Login Started');

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ credentials: AuthDTO }>(),
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>(),
);

export const logout = createAction('[Auth] Logout');
