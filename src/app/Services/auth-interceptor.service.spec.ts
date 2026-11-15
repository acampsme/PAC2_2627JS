import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';

import { AuthInterceptorService } from './auth-interceptor.service';
import { authReducer } from '../Store/auth/auth.reducer';

describe('AuthInterceptorService', () => {
  let service: AuthInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({ auth: authReducer })],
    });
    service = TestBed.inject(AuthInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
