import { Component, Input, OnInit} from '@angular/core';
import { ApiService } from '../../service/api.service';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Menu } from '../../interfaces/Menu';
import { DistributiondetailsComponent } from '../distributiondetails/distributiondetails.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [DistributiondetailsComponent],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent implements OnInit {
  @Input() menuId!: number;
  buttonsFound!: Menu[];
  isLt: boolean = false;
  dd:boolean = false;
  
  constructor(private readonly apiService: ApiService) {}
  
  ngOnInit(): void {
    console.log("report");
      this.getNavButtons(this.menuId);
      this.dd=false;
  }

  getNavButtons(id:number){
    const param = new HttpParams().append("parentId" , id);
    this.apiService.getNavButtons(param)
    .subscribe({
      next : (res : Menu[]) =>{
        if(res.length!=0){
          console.log(res);
          this.buttonsFound = res;
        }
      }, 
      error : (error: HttpErrorResponse)=>{
        console.log(error);
      }
    })
  }
  showDetails(menuId: number){
    if(menuId==10){
      this.dd=true;
    }else{
      this.dd=false;
    }
  }
}
