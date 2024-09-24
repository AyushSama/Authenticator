import { History } from './../../interfaces/History';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ApiService } from '../../service/api.service';
import { HttpErrorResponse} from '@angular/common/http';
import { Subject, takeUntil } from 'rxjs';
 
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterLinkActive],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {


  openModal: boolean = false;
  historyData!:History[];

  constructor(
    private route : Router,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
      this.getHistory();
  }

  openHistory(): void {
    this.openModal = true;
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
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        },
      });
  }
}