import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-navbar-content',
  standalone: true,
  imports: [],
  templateUrl: './navbar-content.component.html',
  styleUrl: './navbar-content.component.css',
})
export class NavbarContentComponent implements OnInit {
  @Input() buttonLabel!: string;

  isButton: boolean = false;
  content: string = '';
  buttonContent: string = '';
  buttonsFound: any = [];
  isLt: boolean = false;

  constructor(private readonly apiService: ApiService) {}

  ngOnInit(): void {
    this.buttonLabel = this.buttonLabel.replace(/\s+/g, '');
  }

  handleButtons(button: any) {
    if (button.value == 1) {
      this.isLt = true;
    } else if (button.value == 3) {
      this.isLt = false;
    } else {
        let route = button.key.replace(/\s+/g, '').replace('-','').replace('+','');
        route = route.charAt(0).toLowerCase() + route.slice(1);
    }
  }
}
