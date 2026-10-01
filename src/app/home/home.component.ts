import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  OnInit,
  PLATFORM_ID,
  inject
} from '@angular/core';

import { HomeChildComponent } from '../home-child/home-child.component';
import { TodaysIdeaChildComponent } from '../todays-idea-child/todays-idea-child.component';
import { ViewAllChildComponent } from '../view-all-child/view-all-child.component';

import {
  IdeaService,
  IdeaResponse
} from '../../services/idea.service';

import { MatIconModule } from '@angular/material/icon';

@Component({
  imports: [
    HomeChildComponent,
    TodaysIdeaChildComponent,
    ViewAllChildComponent,
    CommonModule,
    MatIconModule
  ],
  selector: 'app-home',
  styleUrl: './home.component.scss',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  private ideaService = inject(IdeaService);
  private cdr = inject(ChangeDetectorRef);
  private platformId = inject(PLATFORM_ID);

  todaysIdeas: IdeaResponse[] = [];
  allIdeas: IdeaResponse[] = [];

  showAllPlans = false;

  cards = [
    {
      title: 'Total Ideas',
      value: 0,
      icon: 'lightbulb_outline'
    },
    {
      title: 'Implemented',
      value: 0,
      icon: 'check_circle_outline'
    },
    {
      title: 'Pending',
      value: 0,
      icon: 'schedule'
    },
    {
      title: 'Favorites',
      value: 0,
      icon: 'favorite_border'
    }
  ];

  ngOnInit(): void {

    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.loadDashboard();
    this.loadTodayIdeas();
  }

  loadDashboard(): void {

    this.ideaService.getDashboard().subscribe({
      next: (response) => {

        this.cards = [
          {
            title: 'Total Ideas',
            value: response.totalIdeas,
            icon: 'lightbulb_outline'
          },
          {
            title: 'Implemented',
            value: response.implemented,
            icon: 'check_circle_outline'
          },
          {
            title: 'Pending',
            value: response.pending,
            icon: 'schedule'
          },
          {
            title: 'Favorites',
            value: response.favorites,
            icon: 'favorite_border'
          }
        ];

        this.cdr.detectChanges();
      },

      error: (error) => {
        console.error('Dashboard error:', error);
      }
    });
  }

  loadTodayIdeas(): void {

    this.ideaService.getTodayIdeas().subscribe({
      next: (response) => {

        this.todaysIdeas = response;

        this.cdr.detectChanges();
      },

      error: (error) => {
        console.error('Today ideas error:', error);
      }
    });
  }

  viewall(): void {

    this.showAllPlans = true;

    this.ideaService.getAllIdeas().subscribe({
      next: (response) => {

        this.allIdeas = response;

        this.cdr.detectChanges();
      },

      error: (error) => {
        console.error('All ideas error:', error);
      }
    });
  }

  closeAllPlans(): void {
    this.showAllPlans = false;
    this.allIdeas = [];
  }
}