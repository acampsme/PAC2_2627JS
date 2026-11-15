import { loginSuccess, logout } from './auth.actions';
import { authReducer, initialAuthState } from './auth.reducer';

describe('authReducer', () => {
  it('stores the authenticated user and access token after login', () => {
    const state = authReducer(
      initialAuthState,
      loginSuccess({ userId: 'user-1', accessToken: 'token-1' }),
    );

    expect(state).toEqual({ userId: 'user-1', accessToken: 'token-1' });
  });

  it('clears authentication state after logout', () => {
    const authenticatedState = {
      userId: 'user-1',
      accessToken: 'token-1',
    };

    expect(authReducer(authenticatedState, logout())).toEqual(
      initialAuthState,
    );
  });
});
