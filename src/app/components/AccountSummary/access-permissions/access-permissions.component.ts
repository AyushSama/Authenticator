import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { AccountsummaryService } from '../../../service/AccountSummaryService/accountsummary.service';

interface Table1 {
  total: number;
  totalRes: number;
}

interface Table2 {
  current: number;
}

interface Table3 {
  expired: number;
}

interface Table4 {
  // Define properties if any, otherwise set to null or use any
}

interface Table5 {
  tot: number;
}

interface Survey {
activateDate: string;    // Date when the survey was activated
title: string;           // Title of the survey
duration: number;        // Duration of the survey in minutes
distributionNo: number;  // Number of distributions sent
startDate: string;       // Start date of the survey
endDate: string;         // End date of the survey
isRecycled: number;  
}

interface DataEntry {
  table1: Table1;
  table2: Table2;
  table3: Table3;
  table4: Table4 | null;
  table5: Table5;
  table7s: Survey[] | null;
  flag: number;
}

interface Message {
  outParam: any; // Adjust type based on actual structure
  messages: any; // Adjust type based on actual structure
  userMessage: string;
  exceptionMessage: any; // Adjust type based on actual structure
  screenId: number;
  apiAddress: string;
  status: boolean;
}

// Rename ApiResponse to CorporateApiResponse
interface CorporateApiResponse {
  data: DataEntry[];
  message: Message;
}

@Component({
  selector: 'app-access-permissions',
  standalone: true,
  imports: [MatCardModule, MatTableModule, FormsModule, CommonModule],
  templateUrl: './access-permissions.component.html',
  styleUrl: './access-permissions.component.css'
})
export class AccessPermissionsComponent implements OnInit {

  @Input() selectedAccount: string = '';
  @Input() accounts: any[] = [];
  corporateData: any = [];
  surveyData: any = [];
  deletedData: any = [];
  showCorporateData: any;
  corporateNo: number = 2708;
  accountType: number = 0;
  product: number = 0;
  totalInvitaion: number = 0;
  apiResponse: CorporateApiResponse;

  constructor(private apiService: AccountsummaryService) {
    this.apiResponse = {
      data: [
        {
          table1: {
            total: 0,
            totalRes: 0,
          },
          table2: {
            current: 0,
          },
          table3: {
            expired: 0,
          },
          table4: null,
          table5: {
            tot: 0,
          },
          table7s: [],
          flag: 0,
        },
      ],
      message: {
        outParam: null,
        messages: null,
        userMessage: "Search Result successful",
        exceptionMessage: null,
        screenId: 115,
        apiAddress: "/api/ProcGetActivatorCorpDetails/list",
        status: true
      }
    };
  }

  ngOnInit(): void {
    
    if (this.selectedAccount) {
      this.getCorporateData(this.selectedAccount);
    }
  }

  onAccountChange(event: any): void {
    const selectedValue = event.target.value;
    this.selectedAccount = selectedValue;
    this.getCorporateData(this.selectedAccount);
  }

  getCorporateData(corporateId: string): void {
    this.apiService.getCorporateDataById(corporateId).subscribe(
      (data: any) => {
        if (data && data.length > 0) {
          this.corporateData = data[0];
          this.showCorporateData = this.corporateData;
          console.log(this.corporateData);
          this.corporateNo = this.corporateData.corporate_no;
          console.log('new corp number ', this.corporateNo);
          this.generateReport(this.corporateNo);
          this.generateSurveyData(this.corporateNo);
          this.generateSurveyDataForDeleted(this.corporateNo);
          this.totalSendInvitations(this.corporateNo);
        } else {
          console.error('No data found for the selected corporate ID.');
        }
      },
      (error) => {
        console.error('Error fetching corporate data:', error);
        this.corporateData = [];
      }
    );
  }

  generateSurveyData(corpNo:number): void{
    this.apiService.getSurveyData(corpNo).subscribe(
      (response)=>{
        this.surveyData = response;
        console.log("SurveyData",this.surveyData);
    });
  }
  generateSurveyDataForDeleted(corpNo: number): void {
    this.apiService.getSurveyDataForDeleted(corpNo).subscribe(
      (response) => {
        this.deletedData = response;
        console.log("Survey Data:", this.surveyData);
      },
      (error) => {
        console.error("Error fetching survey data:", error);
      }
    );
  }


  totalSendInvitations(corpNo: number){
    this.apiService.totalInvitationsSent(corpNo).subscribe(
      (response)=>{
        this.totalInvitaion = response;
        console.log(this.totalInvitaion);
      }
    );

  }

  generateReport(corpNo: number): void {
    const accountTypeString = this.accountType.toString();
    const productString = this.product.toString();

    this.apiService
      .getActivatorCorpDetails(corpNo, accountTypeString, productString)
      .subscribe(
        (response) => {
          this.apiResponse = response;
          console.log('Activator Corp Details:', this.apiResponse);
          this.corporateData.table7s = this.apiResponse.data[0].table7s;
          console.log('Survey Data:', this.corporateData.table7s);
        },
        (error) => {
          console.error('Error fetching activator corp details:', error);
        }
      );
  }

}
