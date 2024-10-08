import { Component, Input, OnInit} from '@angular/core';
import { ApiService } from '../../service/api.service';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Menu } from '../../interfaces/Menu';
import { LogindetailsComponent } from '../logindetails/logindetails.component';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [LogindetailsComponent],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent implements OnInit {
  @Input() menuId!: number;
  buttonsFound!: Menu[];
  isLt: boolean = false;
  
  constructor(private readonly apiService: ApiService) {}
  
  ngOnInit(): void {
      this.getNavButtons(this.menuId);
  }

  getNavButtons(id:number){
    const param = new HttpParams().append("parentId" , id);
    this.apiService.getNavButtons(param)
    .subscribe({
      next : (res : Menu[]) =>{
        if(res.length!=0){
          console.log("Nav ",res);
          this.buttonsFound = res;
        }
      }, 
      error : (error: HttpErrorResponse)=>{
        console.log(error);
      }
    })
  }
  showLoginbool=false;
  showLoginDetails(button:any){
    if(button.menuId==8){
      this.showLoginbool=true;
    }
  }
}
