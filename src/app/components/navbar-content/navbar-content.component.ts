import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-navbar-content',
  standalone: true,
  imports: [],
  templateUrl: './navbar-content.component.html',
  styleUrl: './navbar-content.component.css'
})
export class NavbarContentComponent implements OnInit {

  @Input() buttonLabel!:string;

  isButton:boolean = false;
  content:string = "";
  buttonContent:string = "";
  buttonsFound:any = [];
  isLt:boolean = false;

  constructor(private readonly apiService : ApiService){}
  
  ngOnInit(): void {
    this.buttonLabel = this.buttonLabel.replace(/\s+/g, '');
    this.getContent();
  }

  getContent(){
    console.log("here");
    this.apiService.getNavButtonData(this.buttonLabel)
    .subscribe({
      next : (res : any) =>{
        if(res.button){
          this.isButton = true
          // this.buttonContent = res.button;
          this.buttonsFound = res.button;
          console.log(this.buttonsFound);
        }
        this.content = res.message;
      }, 
      error : (error: HttpErrorResponse)=>{
        console.log(error);
      }
    })
  }

  handleButtons(value:number){
    if(value==1){
      this.isLt = true;
    }
    else if(value==3){
      this.isLt = false;
    }
  }

}
