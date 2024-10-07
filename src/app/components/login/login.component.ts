import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../service/api.service';
import { Subject, takeUntil } from 'rxjs';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { RecaptchaModule } from 'ng-recaptcha';
import { InactivityService } from '../../services/inactivity.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule, RecaptchaModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {

  constructor(
    public formbuilder: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private inactivity : InactivityService
  ) {}
  
  showCaptcha: boolean = false;
  siteKey: string = environment.captchaSiteKey;
  captchaResponse: string | null = null;
  
  
  ngOnInit(): void {
      this.inactivity.startTrackingInactivity();
  }
  username: string = '';
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
    this.authenticateUser(this.username,this.password);
  }

  onCaptchaResolved(captchaResponse: string | null) {
    this.captchaResponse = captchaResponse;
  }

  handleNewUser(){
    this.router.navigate(['/signup']);
  }

  authenticateUser(username: string, password: string){
    const params = new HttpParams()
      .set('username', username)
      .set('password', password);
    this.apiService
      .authenticateUser(params)
      .pipe(takeUntil(this._onDestroy))
      .subscribe({
        next: (res: any) => {
          console.log(res);
          if(res)
            this.router.navigate(['/home']);
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
          alert("Wrong User!");
        },
      });

  }
}
