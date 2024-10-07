import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Menu } from '../../interfaces/Menu';

@Component({
  selector: 'app-navbar-content',
  standalone: true,
  imports: [],
  templateUrl: './navbar-content.component.html',
  styleUrl: './navbar-content.component.css',
})
export class NavbarContentComponent implements OnInit {
  @Input() menuId!: number;
  buttonsFound!: Menu[];
  isLt: boolean = false;
  
  constructor(private readonly apiService: ApiService) {}
  
  ngOnInit(): void {
      this.getNavButtons();
  }

  getNavButtons(){
    const param = new HttpParams().append("parentId" , this.menuId);
    this.apiService.getNavButtons(param)
    .subscribe({
      next : (res : Menu[]) =>{
        console.log(res);
        this.buttonsFound = res;
      }, 
      error : (error: HttpErrorResponse)=>{
        console.log(error);
      }
    })
  }


  handleButtons(temp : any){
  }

}
