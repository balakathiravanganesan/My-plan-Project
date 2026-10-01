import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { IdeaResponse } from '../../services/idea.service';

@Component({
  imports: [
    CommonModule,
    MatIconModule
  ],
  selector: 'app-idea-child',
  styleUrl: './idea-child.component.scss',
  templateUrl: './idea-child.component.html',
})
export class IdeaChildComponent {

  @Input() ideaData!: IdeaResponse;

  @Output() editIdea = new EventEmitter<number>();
  @Output() deleteIdea = new EventEmitter<number>();
  @Output() favoriteIdea = new EventEmitter<number>();

  onEdit(): void {
    console.log('EDIT CLICKED:', this.ideaData.id);
    this.editIdea.emit(this.ideaData.id);
  }

  onDelete(): void {
    console.log('DELETE CLICKED:', this.ideaData.id);
    this.deleteIdea.emit(this.ideaData.id);
  }

  onFavorite(): void {
    console.log('FAVORITE CLICKED:', this.ideaData.id);
    this.favoriteIdea.emit(this.ideaData.id);
  }
}