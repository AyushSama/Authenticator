import { Component, ComponentFactoryResolver, Input, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import { ApiService } from '../../service/api.service';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Menu } from '../../interfaces/Menu';
import { LogindetailsComponent } from '../logindetails/logindetails.component';
import { Router } from '@angular/router';
import { SCPLComponent } from '../scpl/scpl.component';
import { ReportsdataComponent } from '../AccountSummary/reportsdata/reportsdata.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [LogindetailsComponent,ReportsdataComponent, CommonModule, SCPLComponent],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent implements OnInit {

  @ViewChild('componentDiv', { read: ViewContainerRef, static: true })
  componentDiv!: ViewContainerRef;
  
  @Input() menuId!: number;
  buttonsFound!: Menu[];
  isLt: boolean = false;
  generateData: string = '';
  
  constructor(private readonly apiService: ApiService, private router : Router) {}
  
  ngOnInit(): void {
    console.log("report");
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
  
  showLoginDetails(button:any){
    if(this.menuId==4 && button.menuId==7 ){
      this.generateData='AccountSummary';
    }
    else if(this.menuId==4 && button.menuId==8 ){
      this.generateData='LoginDetails';
    }
    else if(this.menuId==4 && button.menuId==9 ){
      this.generateData='scpl';
    }
    else{
      this.generateData='';
    }
  }
}
