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

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [ReportsdataComponent, CommonModule, SCPLComponent,ClientlistComponent],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css',
})
export class ReportsComponent implements OnInit {

  @Input() menuId!: number;
  buttonsFound!: Menu[];
  isLt: boolean = false;
  genrateData: string = '';

  constructor(
    private readonly apiService: ApiService,
    private readonly router: Router,
  ) {}

  clientList: boolean = false;

  ngOnInit(): void {
    console.log('report');
    this.getNavButtons(this.menuId);
  }

  getNavButtons(id: number) {
    const param = new HttpParams().append('parentId', id);
    this.apiService.getNavButtons(param).subscribe({
      next: (res: Menu[]) => {
        if (res.length != 0) {
          console.log(res);
          this.buttonsFound = res;
        }
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }

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
    }
  }

  navigateToClientList() {
    this.router.navigateByUrl('clientlist');
  }

  
}
