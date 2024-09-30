import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class InactivityService {
  private inactivityTimeout: number = 10000; // 10 minutes
  private timeoutId: any;

  constructor(private router: Router) {}

  startTrackingInactivity() {
    this.resetTimeout();
    window.addEventListener('mousemove', this.resetTimeout.bind(this));
    window.addEventListener('keydown', this.resetTimeout.bind(this));
    window.addEventListener('scroll', this.resetTimeout.bind(this));
    window.addEventListener('click', this.resetTimeout.bind(this));
    window.addEventListener('focus', this.resetTimeout.bind(this));
    window.addEventListener('blur', this.resetTimeout.bind(this));
  }

  private resetTimeout() {
    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(() => this.handleLogout(), this.inactivityTimeout);
  }

  private handleLogout() {
    localStorage.removeItem('token')
    this.router.navigate(['/login']);
  }
}