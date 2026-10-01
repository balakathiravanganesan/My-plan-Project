import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { IdeaResponse } from '../../services/idea.service';

@Component({
  selector: 'app-todays-idea-child',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule
  ],
  styleUrl: './todays-idea-child.component.scss',
  templateUrl: './todays-idea-child.component.html'
})
export class TodaysIdeaChildComponent {

  @Input() ideaData: IdeaResponse | null = null;

}