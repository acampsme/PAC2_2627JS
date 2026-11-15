import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

export interface AppState {
  auth: AuthState;
}

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectUserId = createSelector(
  selectAuthState,
  (state) => state.credentials?.user_id ?? null,
);

export const selectAccessToken = createSelector(
  selectAuthState,
  (state) => state.credentials?.access_token ?? null,
);

export const selectIsAuthenticated = createSelector(
  selectAccessToken,
  (accessToken) => Boolean(accessToken),
);
