import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../service/api.service';
import { Subject, takeUntil } from 'rxjs';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule,FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor (public formbuilder:FormBuilder, private apiService : ApiService){}

  email: string = '';
  password: string = '';
  submitted: boolean = false;
  protected _onDestroy = new Subject<void>();


  handleLogin() {
    this.submitted = true; // Mark the form as submitted
    this.loginUser(this.email,this.password);
  } 

  loginUser(email:string,password:string) {
    const params = new HttpParams()
      .set('email', email)
      .set('password', password);
    this.apiService
      .getUser(params)
      .pipe(takeUntil(this._onDestroy))
      .subscribe({
        next: (res: any) => {
          localStorage.setItem("token",res.token);
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        },
      });
  }
}
