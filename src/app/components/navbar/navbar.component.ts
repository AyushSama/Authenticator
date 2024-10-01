import { Component, OnInit } from '@angular/core';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { ApiService } from '../../service/api.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatButtonToggleModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  navButtons:string[] = [];

  constructor(private apiService : ApiService){}

  ngOnInit(): void {
      this.getButtons();
  }

  getButtons(){
    this.apiService.getNavButtons()
    .subscribe({
      next : (res : any) =>{
        console.log(res);
        this.navButtons = res;
      }, 
      error : (error: HttpErrorResponse)=>{
        console.log(error);
      }
    })
  }
}
