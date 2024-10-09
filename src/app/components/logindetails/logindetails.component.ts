// import { ApiService } from './../../services/api.service';
import { Component, ViewChild } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
// import { DetailstableComponent } from '../detailstable/detailstable.component';

// import { Iresult } from '../../interface/Iresult';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ApiService } from '../../service/api.service';
//pushed by iqra 123
// added
@Component({
  selector: 'app-logindetails',
  standalone: true,
  imports: [
    FormsModule,
    MatPaginatorModule,
    CommonModule,
    MatButtonModule,
    FormsModule,
    MatTableModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './logindetails.component.html',
  styleUrl: './logindetails.component.scss',
})
export class LogindetailsComponent {
  selectedAccountType: string = '';
  selectedProductType: string = '';
  clickedOnGen: boolean = false;
  status: string = 'All';

  currentPage: number = 0;
  pageSize: number = 10;
  pageSizeOptions: number[] = [5, 10, 50, 100];

  fromDate!: string;
  fromMonth!: string;
  fromDay!: number;
  fromYear!: number;
  toDate!: string;
  toMonth!: string;
  toDay!: number;
  toYear!: number;

  searchTerm: string = '';
  totalRecords!: number;

  months: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  days: number[] = Array.from({ length: 31 }, (_, i) => i + 1);
  years: number[] = Array.from(
    { length: 100 },
    (_, i) => new Date().getFullYear() - i
  );

  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = [
    'Login_Id',
    'Login_Date',
    'IP_Address',
    'Logon_Status',
    'Master_Login',
  ];
  public isLoadingResults = true;
  // constructor(private router: Router, private apiService: ApiService) {}
  constructor(private router: Router, private apiService: ApiService) {}

  ngOnInit(): void {
    const currentDate = new Date();
    // Set To Date (7 days from current date)
    const fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - 7);

    this.fromMonth = this.months[fromDate.getMonth()];
    this.fromDay = fromDate.getDate();
    this.fromYear = fromDate.getFullYear();
    // Set From Date (current date)

    this.toMonth = this.months[currentDate.getMonth()];
    this.toDay = currentDate.getDate();
    this.toYear = currentDate.getFullYear();
  }

  changed() {
    this.currentPage = 0;
    this.paginator.pageIndex = 0;
    this.fetchData();
  }
  searchchange() {
    this.currentPage = 0;
    this.paginator.pageIndex = 0;
  }
  fetchData(): void {
 
    this.isLoadingResults = true;
    const fromMonthIndex = this.months.indexOf(this.fromMonth) + 1; // +1 to convert to 1-12 range
    const toMonthIndex = this.months.indexOf(this.toMonth) + 1;

    this.fromDate = `${this.fromYear}-${String(fromMonthIndex).padStart(
      2,
      '0'
    )}-${String(this.fromDay).padStart(2, '0')}`;

    this.toDate = `${this.toYear}-${String(toMonthIndex).padStart(
      2,
      '0'
    )}-${String(this.toDay).padStart(2, '0')}`;

    console.log("From : ",this.fromDate);
    console.log("From : ",this.toDate);
    console.log(typeof(this.toYear));
    
    if(this.toYear < this.fromYear){
      alert("Please enter a valid Date")
      return;
    }
    else if(toMonthIndex < fromMonthIndex){
      alert("Please enter a valid Date")
      return;
    }
    else if(this.toDay < this.fromDay){
      alert("Please enter a valid Date")
      return;
    }

    const requestBody = {
      startDate: this.fromDate,
      endDate: this.toDate,
      search: this.searchTerm,
      accType: this.selectedAccountType,
      lang: this.selectedProductType,
      status: this.status,
      pageNumber: this.currentPage,
      pageSize: this.pageSize,
    };

    this.apiService.getRecordsApi(requestBody).subscribe({
      next: (res: any) => {
        console.log(res);
        if (res.data.length > 0) {
          this.clickedOnGen = true;
          this.isLoadingResults = false;
          // this.dataSource.data = res;
          // this.totalRecords = res[0].totalCount;
          this.dataSource.data = res.data;
          this.totalRecords = res.totalCount;
        } else {
          alert('No Records Found');
          this.totalRecords = 0;
          this.dataSource.data = res;
        }
      },
      error: (err) => {
        console.error('Error fetching data:', err);
      },
    });
  }

  onPageChange(event: any): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.fetchData();
  }
}
