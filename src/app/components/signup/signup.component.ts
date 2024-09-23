import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../service/api.service';
import { Subject, takeUntil } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../../interfaces/User';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  email: string = '';
  password: string = '';
  submitted: boolean = false;
  protected _onDestroy = new Subject<void>();

  constructor(private apiService : ApiService,private router: Router){}

  handleSignup() {
    this.submitted = true; // Mark the form as submitted
    if (this.email && this.password) {
      const user: User = {
        userId : 0,
        email: this.email,
        password: this.password,
        createdDate: new Date() // Add createdDate
      };
      console.log(user);
      this.signUpUser(user);
    }
  }

  signUpUser(user:User){
    this.apiService
      .postUser(user)
      .pipe(takeUntil(this._onDestroy))
      .subscribe({
        next: (res: any) => {
          console.log(res);
          this.router.navigate(['/login']);
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        },
      });
  }


}
