import { Component, OnInit } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';

import { ApiService } from '../../service/api.service';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { NavbarContentComponent } from "../navbar-content/navbar-content.component";
import { Menu } from '../../interfaces/Menu';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatTabsModule, NavbarContentComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  navButtons:Menu[] = [];

  constructor(private readonly apiService : ApiService){}

  ngOnInit(): void {
      this.getButtons();
  }

  getButtons(){
    const param = new HttpParams().append("parentId" , 0);
    this.apiService.getNavButtons(param)
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
