import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  OnInit,
  inject,
  PLATFORM_ID
} from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

import { IdeaChildComponent } from '../idea-child/idea-child.component';

import {
  IdeaService,
  IdeaResponse
} from '../../services/idea.service';

@Component({
  selector: 'app-ideas',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    IdeaChildComponent
  ],
  templateUrl: './ideas.component.html',
  styleUrl: './ideas.component.scss'
})
export class IdeasComponent implements OnInit {

  private router = inject(Router);
  private ideaService = inject(IdeaService);
  private cdr = inject(ChangeDetectorRef);
  private platformId = inject(PLATFORM_ID);

  ideas: IdeaResponse[] = [];

  ngOnInit(): void {

    if (isPlatformBrowser(this.platformId)) {
      this.loadIdeas();
    }

  }

  loadIdeas(): void {

    this.ideaService.getAllIdeas().subscribe({

      next: (response) => {

        this.ideas = response;
        this.cdr.detectChanges();
      },


    });
  }

addideas(): void {
    this.router.navigate(['/create-ideas']);
  }

onEdit(id: number): void {

  console.log('PARENT EDIT:', id);

  this.router.navigate(['/create-ideas'], {
    queryParams: {
      id: id
    }
  });
}

onDelete(id: number): void {

  console.log('PARENT DELETE:', id);

  const confirmed = confirm(
    'Are you sure you want to delete this idea?'
  );

  if (!confirmed) {
    return;
  }

  this.ideaService.deleteIdea(id).subscribe({

    next: (response) => {

      console.log('DELETE SUCCESS:', response);

      this.loadIdeas();
    },

    error: (error) => {

      console.error('DELETE ERROR:', error);

      alert(
        error.error?.message ||
        'Failed to delete idea'
      );
    }

  });
}

onFavorite(id: number): void {

  console.log('PARENT FAVORITE:', id);

  this.ideaService.toggleFavorite(id).subscribe({

    next: (response) => {

      console.log('FAVORITE SUCCESS:', response);

      this.loadIdeas();
    },

    error: (error) => {

      console.error('FAVORITE ERROR:', error);

      alert(
        error.error?.message ||
        'Failed to update favorite'
      );
    }

  });
}
}