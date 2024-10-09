import {
  Component,
  ComponentFactoryResolver,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ApiService } from '../../service/api.service';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Menu } from '../../interfaces/Menu';
import { SCPLComponent } from '../scpl/scpl.component';
import { ReportsdataComponent } from '../AccountSummary/reportsdata/reportsdata.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ClientlistComponent } from '../clientlist/clientlist.component';
import { LogindetailsComponent } from '../logindetails/logindetails.component';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [ReportsdataComponent, LogindetailsComponent, CommonModule, SCPLComponent,ClientlistComponent],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css',
})
export class ReportsComponent implements OnInit {

  @Input() menuId!: number;
  buttonsFound!: Menu[];
  isLt: boolean = false;
  generateData: string = '';

  constructor(
    private readonly apiService: ApiService,
    private readonly router: Router,
  ) {}

  clientList: boolean = false;

  ngOnInit(): void {
    console.log('report');
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
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }
  
  showLoginDetails(button:any){
    if(this.menuId==4 && button.menuId==7 ){
      this.generateData='AccountSummary';
    }
    else if(this.menuId==4 && button.menuId==8 ){
      this.generateData='LoginDetails';
    }else if (this.menuId==4 && button.menuId==11) {
      this.generateData='clientList';
    }else if(this.menuId==4 && button.menuId==9 ){
      this.generateData='scpl';
    }
    else{
      this.generateData='';
    }
  }

  navigateToClientList() {
    this.router.navigateByUrl('clientlist');
  }

  
}
