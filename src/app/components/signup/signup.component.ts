import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../service/api.service';
import { Subject, takeUntil } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

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
      this.signUpUser(this.email,this.password);
    }
  }

  signUpUser(email:string,password:string){
    this.apiService
      .postUser(email,password)
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
