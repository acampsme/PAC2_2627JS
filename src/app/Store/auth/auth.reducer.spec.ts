import {
  loginFailure,
  loginStarted,
  loginSuccess,
  logout,
} from './auth.actions';
import { authReducer, initialAuthState } from './auth.reducer';

describe('authReducer', () => {
  it('sets the loading state when login starts', () => {
    const state = authReducer(initialAuthState, loginStarted());

    expect(state).toEqual({
      credentials: null,
      loading: true,
      loaded: false,
      error: null,
    });
  });

  it('stores credentials after successful login', () => {
    const credentials = {
      user_id: 'user-1',
      access_token: 'token-1',
      email: 'user@example.com',
      password: '',
    };
    const state = authReducer(
      initialAuthState,
      loginSuccess({ credentials }),
    );

    expect(state).toEqual({
      credentials,
      loading: false,
      loaded: true,
      error: null,
    });
  });

  it('records a login error and stops loading', () => {
    const state = authReducer(
      authReducer(initialAuthState, loginStarted()),
      loginFailure({ error: 'Invalid credentials' }),
    );

    expect(state).toEqual({
      credentials: null,
      loading: false,
      loaded: true,
      error: 'Invalid credentials',
    });
  });

  it('clears authentication state after logout', () => {
    const authenticatedState = {
      credentials: {
        user_id: 'user-1',
        access_token: 'token-1',
        email: 'user@example.com',
        password: '',
      },
      loading: false,
      loaded: true,
      error: null,
    };

    expect(authReducer(authenticatedState, logout())).toEqual(
      initialAuthState,
    );
  });
});
