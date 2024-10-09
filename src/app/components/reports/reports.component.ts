import { Component, Input, OnInit} from '@angular/core';
import { ApiService } from '../../service/api.service';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Menu } from '../../interfaces/Menu';
import { LogindetailsComponent } from '../logindetails/logindetails.component';
import { Router } from '@angular/router';
import { ReportsdataComponent } from '../AccountSummary/reportsdata/reportsdata.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [LogindetailsComponent,ReportsdataComponent,CommonModule],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent implements OnInit {
  @Input() menuId!: number;
  buttonsFound!: Menu[];
  isLt: boolean = false;
  genrateData: boolean = false;
  
  constructor(private readonly apiService: ApiService, private router : Router) {}
  
  ngOnInit(): void {
    console.log("report");
      this.getNavButtons(this.menuId);
      this.showLoginbool=false;
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
    if(this.menuId==4 && button.menuId==8 ){
      this.showLoginbool=true;
    }
    else if(this.menuId==4 && button.menuId==7 ){
      this.genrateData=true;
    }
    else{
      this.showLoginbool=false;
      this.genrateData=false;
    }
  }
}
