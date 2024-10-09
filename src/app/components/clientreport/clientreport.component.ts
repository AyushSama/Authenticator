import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ApiService, GetClientListDataSearchEntity } from '../../service/api.service';
import { ExcelService } from '../../service/excel.service';



const accountTypeMapping: { [key: string]: string } = {
  'All': '1,2,3,4,5', // For all account types
  'External': '1,4,5', // For external accounts
  'Managed': '2', // For managed accounts
  'Internal': '3', // For internal accounts
};
 
const productMapping: { [key: string]: string } = {
  'All': '0', // All products
  'Zarca Engage': '1', // Zarca Engage
  'K12 Engage': '2', // K12 Engage
  "K12 Let's talk": '3', // K12 Let's talk
  "K12 engage + Let's talk": '4', // K12 Engage + Let's talk
};
 
const accountStatusMapping: { [key: string]: number } = {
  'Active': 1, // Active account status
  'Expired': 2, // Expired account status
  'Active, Expired': 0,
};
 
const userTypeMapping: { [key: string]: number } = {
  'Account Administrators': 1, // Admin users
  'Sub-Account Users': 2, // Sub-users
  'Account Administrators, Sub-Account Users': 0,
};
 
const countryMapping: { [key: string]: string } = {
  'USA': '0', // USA
  'UAE': '1', // UAE
  'all-other': '2', // All others
};
 
const subAccountTypeMapping: { [key: string]: number } = {
  'ZI-Domestic': 1,
  'ZI-International': 2,
  'Merck-Domestic': 3,
  'Merck-International': 4,
  'Dubai': 5,
  'Client': 6,
  'Partner': 7,
  'Sandbox': 8,
  'Team': 9,
  'Demo': 10,
};



@Component({
  selector: 'app-clientreport',
  standalone: true,
  imports: [CommonModule,DatePipe,AsyncPipe, MatProgressBarModule  ],
  templateUrl: './clientreport.component.html',
  styleUrl: './clientreport.component.css'
})
export class ClientreportComponent implements OnInit{

  reportData:any={};

  startI=0;
  clientList : any[] =[] ;

  isLoaded : boolean=false;

  constructor(private readonly apiService:ApiService) {};

  excel = inject(ExcelService);

  ngOnInit(): void {
    this.apiService.reportData$.subscribe(data=>{
      this.reportData=data;
    }
    );
    this.fetchClientList();
  }

  fetchClientList(): void {
    const searchModel: GetClientListDataSearchEntity = {
      accountType: accountTypeMapping[this.reportData.accountType] || '1,2,3,4,5', // Default to all account types
      productType: productMapping[this.reportData.product] || '0', // Default to all products
      acStatus:  accountStatusMapping[this.reportData.accountStatus],
      uType: userTypeMapping[this.reportData.userType],
      country: this.reportData.country.split(', ').map((country: string) => countryMapping[country]).join(','), // Map country to numbers
      subAccountType: this.reportData.subAccountType.split(', ').map((type: string) => subAccountTypeMapping[type]).join(','), // Map sub-account type to numbers
      startDate: new Date(this.reportData.createdBetween.start).toLocaleDateString(),
      endDate: new Date(this.reportData.createdBetween.end).toLocaleDateString(),
      expiredStartDate: new Date(this.reportData.expiredBetween.start).toLocaleDateString(),
      expiredEndDate: new Date(this.reportData.expiredBetween.end).toLocaleDateString(),
      startIndex: this.startI,
      pageSize: 100,
    };
  
    console.log(searchModel);
  
    
    this.apiService.getClientList(searchModel).subscribe({
      next: (data) => {
        this.clientList = data.data; 
        console.log(typeof(this.clientList));
        this.isLoaded=true;
      },
      error: (error) => {
        console.error('Error fetching client list:', error);
      },
      complete: () => {
        console.log('Client list fetch completed');
      }

    });
  }
  
  nextPage() {
    if (this.clientList.length == 100) {
      this.isLoaded = false;
      this.startI += 1;
      this.fetchClientList();
    } else {
      alert('No more pages available');
    }
  }

  prevPage() {
    if (this.startI === 0) {
      alert('You are already on the First Page!');
    } else {
      this.isLoaded = false;
      this.startI -= 1;
      this.fetchClientList();
    }
  }

  exportToExcel(){
    if(this.clientList.length > 0){
      this.excel.generateExcel(this.clientList, 'ClientListData');
    }else{
      alert("Client List is Empty");
    }
    
  }

}
