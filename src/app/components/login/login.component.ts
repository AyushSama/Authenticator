import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../service/api.service';
import { Subject, takeUntil } from 'rxjs';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { RecaptchaModule } from 'ng-recaptcha';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule, RecaptchaModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  showCaptcha: boolean = false;
  siteKey: string = environment.captchaSiteKey;
  captchaResponse: string | null = null;

  constructor(
    public formbuilder: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) {}

  email: string = '';
  password: string = '';
  submitted: boolean = false;
  grecaptcha: any;
  token: string | undefined;
  protected _onDestroy = new Subject<void>();

  handleLogin() {
    if (this.showCaptcha && !this.captchaResponse) {
      // CAPTCHA is required but not completed
      alert('Please complete the CAPTCHA');
      return;
    }
    this.submitted = true; // Mark the form as submitted
    this.loginUser(this.email, this.password);
  }

  onCaptchaResolved(captchaResponse: string | null) {
    this.captchaResponse = captchaResponse;
  }

  loginUser(email: string, password: string) {
    const params = new HttpParams()
      .set('email', email)
      .set('password', password);
    this.apiService
      .getUser(params)
      .pipe(takeUntil(this._onDestroy))
      .subscribe({
        next: (res: any) => {
          localStorage.setItem('token', res.token);
          this.router.navigate(['/home']);
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
          if (error.status === 429) {
            this.showCaptcha = true;
            console.log(
              'Too many failed attempts. Show CAPTCHA or block further attempts.'
            );
          }
        },
      });
  }
}
