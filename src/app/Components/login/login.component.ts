import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/Services/auth.service';
import { SharedService } from 'src/app/Services/shared.service';
import { loginSuccess } from 'src/app/Store/auth/auth.actions';
import { AppState } from 'src/app/Store/auth/auth.selectors';
import { AuthDTO } from '../../Models/auth.dto';

type LoginFormModel = {
  email: FormControl<string>;
  password: FormControl<string>;
};

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  // TODO 19
  loginUser: AuthDTO;
  email: FormControl<string>;
  password: FormControl<string>;
  loginForm: FormGroup<LoginFormModel>;

  isValidForm: boolean | null;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private sharedService: SharedService,
    private store: Store<AppState>,
    private router: Router,
  ) {
    // TODO 20

    this.loginUser = new AuthDTO('', '', '', '');
    this.isValidForm = null;

    this.email = new FormControl(this.loginUser.email, {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    });

    this.password = new FormControl(this.loginUser.password, {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(16),
      ],
    });

    this.loginForm = this.formBuilder.group({
      email: this.email,
      password: this.password,
    });
  }

  ngOnInit(): void {}

  login(): void {
    this.isValidForm = false;
    if (this.loginForm.invalid) {
      return;
    }

    this.isValidForm = true;

    const { email, password } = this.loginForm.getRawValue();

    this.loginUser.email = email;
    this.loginUser.password = password;

    this.authService.login(this.loginUser).subscribe({
      next: async (authToken) => {
        this.loginUser.user_id = authToken.user_id;
        this.loginUser.access_token = authToken.access_token;

        this.store.dispatch(
          loginSuccess({
            userId: authToken.user_id,
            accessToken: authToken.access_token,
          }),
        );

        await this.sharedService.managementToast('loginFeedback', true);

        this.router.navigateByUrl('home');
      },
      error: (error: any) => {
        this.sharedService.errorLog(error.error);
        this.sharedService.managementToast('loginFeedback', false, error.error);
      },
    });
  }
}
