import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountsummaryService } from '../../../service/AccountSummaryService/accountsummary.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AccessPermissionsComponent } from '../access-permissions/access-permissions.component';

@Component({
  selector: 'app-reportsdata',
  standalone: true,
  imports: [FormsModule, CommonModule,AccessPermissionsComponent],
  templateUrl: './reportsdata.component.html',
  styleUrl: './reportsdata.component.css'
})
export class ReportsdataComponent implements OnInit{
  selectedAccount: string = ''; 
  genrateData: string = '';  // Selected account
  accounts: any[] = [];       // This will contain the account list
  accountType: number = 0;    // Default account type
  product: number = 0;        // Default product
  areDropdownsDisabled: boolean = false;
  corporate_no? : number; 
  count:number =1;
  change:boolean=false;

 constructor(private router: Router, private accountSummaryService : AccountsummaryService){}

 ngOnInit(): void {
  this.fetchCorporateIds(this.accountType, this.product);
  
}

// Function to fetch corporate IDs from API
fetchCorporateIds(accountType: number, productId: number): void {
  this.accountSummaryService.getCorporateIds(accountType, productId).subscribe(
    (data) => {
      this.accounts = data;
      
      // this.corporateNo = data.corporateNo;
       // Store the first 7 accounts if more than 7 are returned
      console.log('Fetched accounts:', this.accounts);
      
    },
    (error) => {
      console.error('Error fetching corporate IDs:', error);
      console.log(error);
      this.accounts = []; // Clear accounts on error
    }
  );
}

// Function to handle account type change
onAccountTypeChange(): void {
  console.log(this.accountType,this.product);
  this.fetchCorporateIds(this.accountType, this.product);
  
}

// Function to handle product change
onProductChange(): void {
  console.log(this.accountType,this.product);
  this.fetchCorporateIds(this.accountType, this.product);
  
}

// Function to be triggered when Generate Report is clicked
generateReport(): void {
  
  this.genrateData = this.selectedAccount;
  this.areDropdownsDisabled = true;
  
}

ReloadMethod(){
  window.location.reload();
}

}
