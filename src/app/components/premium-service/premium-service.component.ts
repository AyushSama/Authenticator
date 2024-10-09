import { Component, Input, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-premium-service',
  standalone: true,
  imports: [MatTableModule, CommonModule, FormsModule],
  templateUrl: './premium-service.component.html',
  styleUrl: './premium-service.component.css'
})

export class PremiumServiceComponent implements OnInit {
  users!: any;
  features: any[] = [];
  modal: boolean = false;
  searchTerm: string = '';
  searchFeature: string = '';
  searchData!: any[];
  displayedColumns: string[] = ['Sr.No.', 'Advanced Feature', 'Access'];
  featureExracted!: any[];
  searchFeatureArray!: any[];
  account!: any;
  accountType: string = '';
  isDataLoaded: boolean = false;
  loading: boolean = false;
  corporate_no!:number;
  message: string = '';
  isButtonVisible = false;
  isBtnDisable: boolean = true;

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.apiService.getAllUsers().subscribe(response => {
      this.users = response.data;
      this.searchData = response.data;
    });
  }

  searchUsers() {
    this.modal = true;
    this.searchData = this.users;
    if (this.searchTerm == '') {
      this.modal = false;
    }
    this.searchData = this.searchData.filter(data => {
      const matchesSearch = data['corporate_id'].toLowerCase().includes(this.searchTerm.toLowerCase());
      return matchesSearch;
    });
  }

  searchFeatures() {
    if (this.searchFeature.trim() === '') {
      this.featureExracted = [...this.searchFeatureArray];
    }
    else {
      this.featureExracted = this.searchFeatureArray.filter(data => {
        const matchesSearch = data['featureName'].toLowerCase().includes(this.searchFeature.toLowerCase());
        return matchesSearch;
      })
    }
  }

  fetchFeatures(corporate_no: number) {
    this.corporate_no=corporate_no;
    this.apiService.getUserAccountType(corporate_no).subscribe((response) => {
      this.account = response;
      this.accountType = this.account.data.packageDesc;
    });
    this.loading = true;

    this.apiService.fetchUserFeatures(corporate_no).subscribe((response) => {
      this.featureExracted = response.data;
      this.searchFeatureArray = [...this.featureExracted];
      this.isDataLoaded = true;
      this.loading = false;
    });
    this.searchTerm = '';
    this.modal = false;
    this.isButtonVisible = false;
  }


  changePermission(event: Event, index: number) {
    this.isButtonVisible = false;
    this.isBtnDisable=true;
    var element = event.target as HTMLInputElement;
    this.featureExracted[index].featureValue = element.value;
    // console.log(this.featureExracted[index].featureValue);
  }

  changePermissionCheckbox(index: number, checkbox: string) {
    this.isButtonVisible = false;
    this.isBtnDisable = true;
    if (checkbox == 'checked') {
      this.featureExracted[index].featureValue = '0';
    } else {
      this.featureExracted[index].featureValue = '1';
    }
    // console.log(this.featureExracted[index].featureValue);
  }

  updatePermission(){
    this.apiService.updateUserPermission(this.corporate_no, this.featureExracted).subscribe(

      (res)=>{
        this.message = "Success";
        this.isButtonVisible = !this.isButtonVisible;
        this.isBtnDisable = false
      },
      (err)=>{
        this.message = "Fail"
      }

    );
    setTimeout(()=>{
      this.message='';
    },3000);
  }
}
