import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { IdeaResponse } from '../../services/idea.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule
  ],
  selector: 'app-view-all-child',
  styleUrl: './view-all-child.component.scss',
  templateUrl: './view-all-child.component.html',
})
export class ViewAllChildComponent {

  @Input() ideaData!: IdeaResponse;

}