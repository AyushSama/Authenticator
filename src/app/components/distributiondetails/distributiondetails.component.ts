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
  fromDate!: Date;
  toDate!: Date;
  accounts: any[] = [];

  acc:number=0
  prod:number=0

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
    this.apiService.getAccounts(this.acc,this.prod).subscribe((data: any) => {
      // console.log(data);
      this.accounts = [].concat(...data).sort();
    });
  }
  calluserdata(){
    
    if(this.accountType=='All'){
      this.acc=0;
    }
    else if(this.accountType=='External'){
      this.acc = 1;
    }
    else if(this.accountType=='Managed'){
      this.acc=2;
    }
    else if(this.accountType=='Internal'){
      this.acc=3;
    }
    
    if (this.product == 'All') {
      this.prod = 0;
    }
    else if (this.product == 'Zarca Engage') {
      this.prod = 1;
    } else if (this.product == 'K12 Engage') {
      this.prod = 2;
    } else if (this.product == 'K12 Let\'s Talk!') {
      this.prod = 3;
    } else if (this.product == 'K12 Engage + Let\'s Talk!') {
      this.prod = 4;
    }
    console.log("Acc: ",this.acc);
    console.log("Prod: ",this.prod);
      
    this.apiService.getAccounts(this.acc,this.prod).subscribe((data: any) => {
      console.log(data);
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
      this.setProduct = "";

    // Set Account to sent in backend
    if (this.accountType == "All")
      this.setAccountType = "2";
    else if (this.accountType == "External")
      this.setAccountType = "1,4,5";
    else if (this.accountType == "Managed")
      this.setAccountType = "3";
    else if (this.accountType == "Internal")
      this.setAccountType = "1,2,3,4,5";


    console.log("SelectedAcc :",this.selectedAccount);
    
    this.apiService.DataToApi(
      Number(this.selectedAccount),                
      this.fromDate,         
      this.toDate,           
      this.setAccountType,   
      this.setProduct    
    )

    this.apiService.sendDataToApi().subscribe({
      next: (response : any) => {
        console.log('Generating report for:', this.selectedReportType);
        console.log(response);
        
        this.reportData=response.data[0]
        console.log(this.reportData)
      },
      error: (error:any) => {
        console.error('Logs generation failed:', error)},
    });
    console.log("Account type:",this.setAccountType,"Product type:",this.setProduct,
      "Selected Account:",this.selectedAccount,"fromDate",this.fromDate,"todate:",this.toDate,  
    );
   
    
  }
}

