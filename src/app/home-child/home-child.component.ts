import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  imports: [
    CommonModule,
    MatIconModule
  ],
  selector: 'app-home-child',
  styleUrl: './home-child.component.scss',
  templateUrl: './home-child.component.html',
})
export class HomeChildComponent {

  @Input() cardData!: {
    title: string;
    value: number;
    icon: string;
  };

}