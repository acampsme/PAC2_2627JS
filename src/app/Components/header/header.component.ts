import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState, selectIsAuthenticated } from 'src/app/Store/auth/auth.selectors';
import { logout } from 'src/app/Store/auth/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  readonly isAuthenticated$ = this.store.select(selectIsAuthenticated);

  constructor(
    private router: Router,
    private store: Store<AppState>,
  ) {}

  home(): void {
    this.router.navigateByUrl('home');
  }

  login(): void {
    this.router.navigateByUrl('login');
  }

  register(): void {
    this.router.navigateByUrl('register');
  }

  adminPosts(): void {
    this.router.navigateByUrl('posts');
  }

  adminCategories(): void {
    this.router.navigateByUrl('categories');
  }

  profile(): void {
    this.router.navigateByUrl('profile');
  }

  dashboard(): void {
    this.router.navigateByUrl('dashboard');
  }

  logout(): void {
    this.store.dispatch(logout());
    this.router.navigateByUrl('/home');
  }
}
