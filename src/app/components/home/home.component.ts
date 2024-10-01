import { History } from './../../interfaces/History';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ApiService } from '../../service/api.service';
import { HttpErrorResponse} from '@angular/common/http';
import { Subject, takeUntil } from 'rxjs';
import { NavbarComponent } from "../navbar/navbar.component";
 
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, NavbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {


  openModal: boolean = false;
  historyData!:History[];

  constructor(
    private route : Router,
    private apiService: ApiService
  ) {}

  openHistory(): void {
    this.getHistory();
  }
 
  closeHistory(): void {
    this.openModal = false;
  }

  handleLogout(){
    localStorage.removeItem('token'); // Remove token
    this.route.navigate(['/login']); // Redirect to login
  }


  protected _onDestroy = new Subject<void>();
  getHistory() {
    this.apiService
      .getHistory()
      .pipe(takeUntil(this._onDestroy))
      .subscribe({
        next: (res: any) => {
          console.log(res);
          this.historyData = res;
          this.openModal = true;
        },
        error: (error: HttpErrorResponse) => {
          alert("Token has been hampered!!");
          localStorage.removeItem('token');
          this.route.navigate(['/login']);
          console.log(error);
        },
      });
  }
}