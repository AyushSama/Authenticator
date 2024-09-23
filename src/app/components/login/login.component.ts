import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../service/api.service';
import { Subject, takeUntil } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule,ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  form!: FormGroup ;
  isSubmitted: boolean=false;

  constructor (public formbuilder:FormBuilder, private apiService : ApiService){}

  ngOnInit(): void {
    this.form=this.formbuilder.group({
      Email: ['', Validators.required],
      Password: ['', Validators.required]
    })
  }

  

  hasDisplayableError(controlName : string):boolean{
    const control=this.form.get(controlName);
    return Boolean(control?.invalid)&& 
    (this.isSubmitted || Boolean(control?.touched) || Boolean(control?.dirty))
  }

  handleLogin(){
    if (this.form.valid) {
      const email = this.form.get('email')?.value;
      const password = this.form.get('password')?.value;

      // Now you can use the email and password values
      console.log('Email:', email);
      console.log('Password:', password);




      // Call your login service here
    } else {
      // Handle form errors
      console.log('Form is invalid');
    }
  }

  protected _onDestroy = new Subject<void>();
  loginUser() {
    this.apiService
      .getUser()
      .pipe(takeUntil(this._onDestroy))
      .subscribe({
        next: (res: any) => {
          console.log(res);
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        },
      });
  }
}
