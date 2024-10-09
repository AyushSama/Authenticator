import { ReportsComponent } from './../reports/reports.component';
import { Component, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { ApiService } from '../../service/api.service';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Menu } from '../../interfaces/Menu';
import { ManageaccountdetailsComponent } from "../manageaccountdetails/manageaccountdetails.component";
import { PremiumServiceComponent } from "../premium-service/premium-service.component";
import { ReportsdataComponent } from '../AccountSummary/reportsdata/reportsdata.component';
import { LoginpagetextComponent } from "../loginpagetext/loginpagetext.component";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatTabsModule, ReportsComponent, ManageaccountdetailsComponent, PremiumServiceComponent, ReportsdataComponent, LoginpagetextComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  Id: number = 1;
  navButtons: Menu[] = [];

  constructor(private readonly apiService: ApiService) { }

  ngOnInit(): void {
    this.getButtons();
  }

  getButtons() {
    const param = new HttpParams().append("parentId", 0);
    this.apiService.getNavButtons(param)
      .subscribe({
        next: (res: any) => {
          console.log(res);
          this.navButtons = res;
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        }
      })
  }

  changeMenuId(menuId: number) {
    this.Id = menuId;
  }
}
