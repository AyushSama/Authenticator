import { Component, OnInit } from '@angular/core';
import { Corporate } from '../../interfaces/Corporate';
import { SurveyDetails } from '../../interfaces/SurveyDetails';
import { MatDialogModule,MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../service/api.service';
import { SortPipe } from "../../sort.pipe";

@Component({
  selector: 'app-scpl',
  standalone: true,
  imports: [FormsModule, CommonModule, SortPipe],
  templateUrl: './scpl.component.html',
  styleUrl: './scpl.component.css'
})
export class SCPLComponent implements OnInit {

  corporateIds: Corporate[] = [];
  surveyDetails: SurveyDetails[] = [];
  selectedCorporateNo!: any;
  surveydetail!: SurveyDetails;
  accountType: string = "";
  product!: string;
  selectSurveyNo!: string;

  acc!: number[];
  prod!: number;

  downloadReport!: Report;

  constructor(
    
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.loadCorporateIds(this.product, this.accountType);
  }

  loadCorporateIds(product: string, account_type: string) {
    this.acc = account_type.split(',').map(Number);
    if (product == '') {
      this.prod = 5;
    } else if (product == 'en') {
      this.prod = 1;
    } else if (product == 'kt') {
      this.prod = 2;
    } else if (product == '1') {
      this.prod = 3;
    } else if (product == '4') {
      this.prod = 4;
    } else {
      this.prod = 5;
    }

    this.apiService.getCorporateIds(this.prod, this.acc).subscribe({
      next: (response: any) => {
        this.corporateIds = response;
        // console.log(response);
      },
      error: (error) => {
        console.error('Error fetching corporate IDs:', error);
      },
    });
  }

  onCorporateChange(): void {
    console.log(this.selectedCorporateNo);
    this.apiService
      .getSurveyDetailsByCorporateNo(this.selectedCorporateNo)
      .subscribe({
        next: (data) => {
          this.surveyDetails = data;
        },
        error: (error) => {
          console.error('Error fetching survey details:', error);
        },
      });
  }

  genreport(): void {
    const report = {
      corpNum: this.selectedCorporateNo,
      surveyNo: this.selectSurveyNo,
      account_Type: this.accountType,
      product_Type: this.product,
    };
    this.apiService.downloadreport(report).subscribe({
      next: (data: Blob) => {
        const url = window.URL.createObjectURL(data);
        const a = document.createElement('a');
        a.href = url;
        a.download = `SurveyData_${report.surveyNo}.xlsx`;
        a.click();
        window.URL.revokeObjectURL(url);
        console.log('Report downloaded successfully');
      },
      error: (error) => {
        console.error('Error generating report:', error);
      },
    });
  }

  

  onClick() {
    this.loadCorporateIds(this.product, this.accountType);
  }

}
