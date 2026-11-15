import { createReducer, on } from '@ngrx/store';
import { loginSuccess, logout } from './auth.actions';

export interface AuthState {
  userId: string | null;
  accessToken: string | null;
}

export const initialAuthState: AuthState = {
  userId: null,
  accessToken: null,
};

export const authReducer = createReducer(
  initialAuthState,
  on(loginSuccess, (_state, { userId, accessToken }) => ({
    userId,
    accessToken,
  })),
  on(logout, () => initialAuthState),
);
