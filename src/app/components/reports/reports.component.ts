import { Component, ComponentFactoryResolver, Input, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import { ApiService } from '../../service/api.service';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Menu } from '../../interfaces/Menu';
import { Router } from '@angular/router';
import { ClientlistComponent } from '../clientlist/clientlist.component';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent implements OnInit {
  @Input() menuId!: number;
  buttonsFound!: Menu[];
  isLt: boolean = false;


  @ViewChild('componentDiv', { read: ViewContainerRef, static: true })
  componentDiv!: ViewContainerRef;
  
  constructor(private readonly apiService: ApiService , private readonly router:Router, private resolver: ComponentFactoryResolver) {}

  clientList:boolean = false;
  
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

  

  navigateToClientList(){
    this.router.navigateByUrl('clientlist')
  }

  loadComponent(menuName: string) {
    this.componentDiv.clear(); // Clear previously loaded components
 
    if (menuName === 'Client List') {
      const factory = this.resolver.resolveComponentFactory(ClientlistComponent);
      this.componentDiv.createComponent(factory);
    }
  }
}
