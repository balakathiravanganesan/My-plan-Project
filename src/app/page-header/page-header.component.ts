import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  Component,
  Inject,
  OnInit,
  PLATFORM_ID
} from '@angular/core';

import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    FormsModule
  ],
  selector: 'app-page-header',
  styleUrl: './page-header.component.scss',
  templateUrl: './page-header.component.html',
})
export class PageHeaderComponent implements OnInit {

  userName = '';
  userInitial = '';
  greeting = '';

  constructor(
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  ngOnInit(): void {

    if (isPlatformBrowser(this.platformId)) {

      this.userName = localStorage.getItem('name') || '';

      if (this.userName) {
        this.userInitial =
          this.userName.charAt(0).toUpperCase();
      }
    }

    this.setGreeting();
  }

  setGreeting(): void {

    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) {
      this.greeting = 'Good Morning';
    }
    else if (hour >= 12 && hour < 17) {
      this.greeting = 'Good Afternoon';
    }
    else if (hour >= 17 && hour < 21) {
      this.greeting = 'Good Evening';
    }
    else {
      this.greeting = 'Good Night';
    }
  }
}