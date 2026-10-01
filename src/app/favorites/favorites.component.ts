import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  OnInit,
  PLATFORM_ID,
  inject
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { FavoriteChildComponent } from '../favorite-child/favorite-child.component';
import { IdeaService, IdeaResponse } from '../../services/idea.service';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    FavoriteChildComponent
  ],
  styleUrl: './favorites.component.scss',
  templateUrl: './favorites.component.html',
})
export class FavoritesComponent implements OnInit {

  private ideaService = inject(IdeaService);
  private cdr = inject(ChangeDetectorRef);
  private platformId = inject(PLATFORM_ID);

  favoriteIdeas: IdeaResponse[] = [];

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadFavorites();
    }
  }

  loadFavorites(): void {
    this.ideaService.getFavorites().subscribe({
      next: (response) => {
        console.log('FAVORITE IDEAS:', response);

        this.favoriteIdeas = response;
        this.cdr.detectChanges();
      },

      error: (error) => {
        console.error('GET FAVORITES ERROR:', error);
      }
    });
  }

  onFavorite(id: number): void {
    console.log('REMOVE FAVORITE:', id);

    this.ideaService.toggleFavorite(id).subscribe({
      next: (response) => {
        console.log('FAVORITE UPDATED:', response);

        // favorite remove ஆனதும் list refresh
        this.loadFavorites();
      },

      error: (error) => {
        console.error('TOGGLE FAVORITE ERROR:', error);
      }
    });
  }
}