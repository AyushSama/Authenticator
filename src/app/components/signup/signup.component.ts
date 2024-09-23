import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  form!: FormGroup ;
  isSubmitted: boolean=false;
 
  constructor (public formbuilder:FormBuilder){}
 
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
}
