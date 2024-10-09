import { Menu } from '../../interfaces/Menu';
import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { HttpParams, HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loginpagetext',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loginpagetext.component.html',
  styleUrl: './loginpagetext.component.css'
})
export class LoginpagetextComponent implements OnInit{
  @Input() menuId!: number;
  buttonsFound!: Menu[];
  isModal:boolean=false;
  textModal:string[]=[''];
 
  constructor(private apiService: ApiService){};
  ngOnInit(): void {
    this.getButtons(this.menuId);
  }
  getButtons(Id:number){
    const param = new HttpParams().append("parentId" , Id);
    this.apiService.getNavButtons(param)
    .subscribe({
     next : (res : Menu[]) =>{
        if(res.length!=0){
          console.log(res);
          this.buttonsFound = res;
        }
      },
      error:(error:HttpErrorResponse)=>{
        console.log(error);
      }
    })
  }
  handleButton(){
    this.isModal=true;
  }
  AddText(){
     this.textModal.push('');
  }
}
