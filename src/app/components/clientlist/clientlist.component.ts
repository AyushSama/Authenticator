import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-clientlist',
  standalone: true,
  imports: [MatFormFieldModule,MatSelectModule,FormsModule,MatCardModule,MatDatepickerModule,MatNativeDateModule],
  templateUrl: './clientlist.component.html',
  styleUrl: './clientlist.component.css'
})
export class ClientlistComponent {

  accountType = 'All Account';
  product = 'All Product';
  accountStatus = [];
  subAccountType = [];
  userType = [];
  country = [];
  createdBy = '';
  createdBetween = { start: '', end: '' };
  expiredBetween = { start: '', end: '' };

  router = inject(Router);
  apiService = inject(ApiService);


  generateReport() {
    const reportData = {
      accountType: this.accountType,
      product: this.product,
      accountStatus: this.accountStatus.join(', '),
      subAccountType: this.subAccountType.join(', '),
      userType: this.userType.join(', '),
      country: this.country.join(', '),
      createdBy: this.createdBy,
      createdBetween: this.createdBetween,
      expiredBetween: this.expiredBetween
    };
  
    this.apiService.updateReportData(reportData);
    this.router.navigateByUrl('clientreport')
  }

}
