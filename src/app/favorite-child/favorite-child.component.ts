import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { IdeaResponse } from '../../services/idea.service';

@Component({
  selector: 'app-favorite-child',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule
  ],
  styleUrl: './favorite-child.component.scss',
  templateUrl: './favorite-child.component.html',
})
export class FavoriteChildComponent {

  @Input() ideaData!: IdeaResponse;

  @Output() favoriteIdea = new EventEmitter<number>();

  onFavorite(): void {
    console.log('CHILD FAVORITE ID:', this.ideaData.id);

    this.favoriteIdea.emit(this.ideaData.id);
  }
}