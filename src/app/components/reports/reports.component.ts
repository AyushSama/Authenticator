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
<<<<<<< HEAD

=======
import { LogindetailsComponent } from '../logindetails/logindetails.component';
import { Router } from '@angular/router';
>>>>>>> master
import { SCPLComponent } from '../scpl/scpl.component';
import { ReportsdataComponent } from '../AccountSummary/reportsdata/reportsdata.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ClientlistComponent } from '../clientlist/clientlist.component';

@Component({
  selector: 'app-reports',
  standalone: true,
<<<<<<< HEAD
  imports: [ReportsdataComponent, CommonModule, SCPLComponent,ClientlistComponent],
=======
  imports: [LogindetailsComponent,ReportsdataComponent, CommonModule, SCPLComponent],
>>>>>>> master
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css',
})
export class ReportsComponent implements OnInit {

  @Input() menuId!: number;
  buttonsFound!: Menu[];
  isLt: boolean = false;
<<<<<<< HEAD
  genrateData: string = '';

  constructor(
    private readonly apiService: ApiService,
    private readonly router: Router,
  ) {}

  clientList: boolean = false;

=======
  generateData: string = '';
  
  constructor(private readonly apiService: ApiService, private router : Router) {}
  
>>>>>>> master
  ngOnInit(): void {
    console.log('report');
    this.getNavButtons(this.menuId);
  }

<<<<<<< HEAD
  getNavButtons(id: number) {
    const param = new HttpParams().append('parentId', id);
    this.apiService.getNavButtons(param).subscribe({
      next: (res: Menu[]) => {
        if (res.length != 0) {
          console.log(res);
=======
  getNavButtons(id:number){
    const param = new HttpParams().append("parentId" , id);
    this.apiService.getNavButtons(param)
    .subscribe({
      next : (res : Menu[]) =>{
        if(res.length!=0){
          console.log("Nav ",res);
>>>>>>> master
          this.buttonsFound = res;
        }
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }
<<<<<<< HEAD

  accountType(button: Menu) {
    if (button.menuName == 'Account Summary') {
      this.genrateData = 'showAccountSummaryComponent';
    } else if (button.menuName == 'Special Case Participants List') {
      this.genrateData = 'scpl';
    } 

    else if (button.menuName === 'Client List') {
      this.genrateData='clientList';
    } else {
      this.genrateData = '';
=======
  
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
>>>>>>> master
    }
  }

  navigateToClientList() {
    this.router.navigateByUrl('clientlist');
  }

  
}
