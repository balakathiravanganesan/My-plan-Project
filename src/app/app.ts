import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  NavigationEnd,
  Router,
  RouterOutlet
} from '@angular/router';
import { filter } from 'rxjs';

import { MenuComponent } from './menu/menu.component';
import { PageHeaderComponent } from './page-header/page-header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MenuComponent,
    PageHeaderComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

  showMenu = false;
  showHeader = false;

  constructor(private router: Router) {

    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe((event: NavigationEnd) => {

        const url = event.urlAfterRedirects;

        // Login & Register -> hide
        if (url === '/login' || url === '/register') {

          this.showMenu = false;
          this.showHeader = false;

        } else {

          // Other pages -> show
          this.showMenu = true;
          this.showHeader = true;

        }

      });
  }
}