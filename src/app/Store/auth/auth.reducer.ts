import { createReducer, on } from '@ngrx/store';
import { AuthDTO } from '../../Models/auth.dto';
import { loginFailure, loginStarted, loginSuccess, logout } from './auth.actions';

export interface AuthState {
  credentials: AuthDTO | null;
  loading: boolean;
  loaded: boolean;
  error: string | null;
}

export const initialAuthState: AuthState = {
  credentials: null,
  loading: false,
  loaded: false,
  error: null,
};

export const authReducer = createReducer(
  initialAuthState,
  on(loginStarted, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(loginSuccess, (_state, { credentials }) => ({
    credentials,
    loading: false,
    loaded: true,
    error: null,
  })),
  on(loginFailure, (_state, { error }) => ({
    ...initialAuthState,
    loaded: true,
    error,
  })),
  on(logout, () => initialAuthState),
);
