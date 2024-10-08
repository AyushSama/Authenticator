import { Component, ComponentFactoryResolver, Input, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import { ApiService } from '../../service/api.service';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Menu } from '../../interfaces/Menu';
import { Router } from '@angular/router';
import { SCPLComponent } from '../scpl/scpl.component';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent implements OnInit {

  @ViewChild('componentDiv', { read: ViewContainerRef, static: true })
  componentDiv!: ViewContainerRef;
  
  @Input() menuId!: number;
  buttonsFound!: Menu[];
  isLt: boolean = false;
  
  constructor(
    private readonly apiService: ApiService,
    private router: Router,
    private resolver: ComponentFactoryResolver,
  ) {}
  
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

  loadComponent(menuName: string) {
    this.componentDiv.clear(); // Clear previously loaded components

    if (menuName === 'Special Case Participants List') {
      const factory = this.resolver.resolveComponentFactory(SCPLComponent);
      this.componentDiv.createComponent(factory);
    }
    // Add more conditions if needed for other components
  }
}
