import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApiService } from "../../service/api.service"
@Component({
  selector: 'app-distributiondetails',
  standalone: true,
  imports: [FormsModule,CommonModule,MatTableModule],
  templateUrl: './distributiondetails.component.html',
  styleUrl: './distributiondetails.component.css'
})
export class DistributiondetailsComponent {
  displayedColumns: string[] = ['survey_no', 'title', 'tot', 'emails_read', 'responses_received', 'reminders_sent', 'last_email_sent'];
  selectedReportType: string = 'Distribution Details';
  setAccountType: string =''
  product: string = "All";
  setProduct: string = ''
  selectedAccount!: number;
  checkCondition:boolean=true;
  reportData:any;
  fromDate: Date=new Date("22-10-2012")
  toDate: Date=new Date();
  accounts: any[] = [];


  corpNo!:number
  startDate!:Date
  endDate!:Date
  accountType:string="All";
  lang!:string

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(){
    this.fetchAccounts();
  }
  fetchAccounts(): void {
    this.apiService.getAccounts().subscribe((data: any) => {
      console.log(data.length);

      this.accounts = [].concat(...data).sort();
    });
  }
  generateReport() {
    // if(this.selectedAccount.length<1 && this.fromDate.length<1 && this.toDate.length<1){

    // }
    
    // console.log(this.product,this.accountType);
    this.checkCondition=false
    // set product to sent in backend 
    if (this.product == "Zarca Engage")
      this.setProduct = "en";
    else if (this.product == "K12 Engage")
      this.setProduct = "kt";
    else if (this.product == "K12 Let's Talk!")
      this.setProduct = "lt";
    else if (this.product == "K12 Engage + Let's Talk!")
      this.setProduct = "lt";
    else if (this.product == "All")
      this.setProduct = " ";

    // Set Account to sent in backend
    if (this.accountType == "All")
      this.setAccountType = "1,4,5";
    else if (this.accountType == "External")
      this.setAccountType = "2";
    else if (this.accountType == "Managed")
      this.setAccountType = "3";
    else if (this.accountType == "Internal")
      this.setAccountType = "1,2,3,4,5";

    this.apiService.DataToApi(
      Number(this.selectedAccount),                
      this.fromDate,         
      this.toDate,           
      this.setAccountType,   
      this.setProduct    
    )

    this.apiService.sendDataToApi().subscribe({
      next: (response : any) => {
        this.reportData=response
      },
      error: (error:any) => {
        console.error('Logs generation failed:', error)},
    });
    // console.log("Account type:",this.setAccountType,"Product type:",this.setProduct,
    //   "Selected Account:",this.selectedAccount,"fromDate",this.fromDate,"todate:",this.toDate,  
    // );
   
    console.log('Generating report for:', this.selectedReportType);
  }
}
