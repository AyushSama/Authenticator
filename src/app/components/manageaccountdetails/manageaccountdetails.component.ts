import { Component, Input, OnInit} from '@angular/core';
import { ApiService } from '../../service/api.service';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Menu } from '../../interfaces/Menu';

@Component({
  selector: 'app-manageaccountdetails',
  standalone: true,
  imports: [],
  templateUrl: './manageaccountdetails.component.html',
  styleUrl: './manageaccountdetails.component.css'
})
export class ManageaccountdetailsComponent implements OnInit {
  @Input() menuId!: number;
  buttonsFound!: Menu[];
  isLt: boolean = false;
  
  constructor(private readonly apiService: ApiService) {}
  
  ngOnInit(): void {
      this.getNavButtons(this.menuId);
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


  handleButtons(button : Menu){
    if(button.menuId == 26)
        button.menuId = 5;
    this.getNavButtons(button.menuId);
  }
}
