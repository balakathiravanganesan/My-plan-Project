import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  OnInit,
  inject,
  PLATFORM_ID
} from '@angular/core';

import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { ActivatedRoute, Router } from '@angular/router';

import {
  IdeaService,
  IdeaResponse
} from '../../services/idea.service';

@Component({
  selector: 'app-create-ideas',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
  ],
  templateUrl: './create-ideas.component.html',
  styleUrl: './create-ideas.component.scss'
})
export class CreateIdeasComponent implements OnInit {

  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private ideaService = inject(IdeaService);
  private platformId = inject(PLATFORM_ID);
  private cdr = inject(ChangeDetectorRef);

 
  editId: number | null = null;
  isEditMode = false;

  title = '';
  description = '';

  selectedCategory = 'Select';
  customcategory = '';

  selectedDate = '';
  selectedTime = '';

  selectedStatus = 'New';
  selectedPriority = 'Low';


  showCategoryDropdown = false;
  showStatus = false;

  reminderEnabled = false;

  reminderDate = '';

  reminderTime = '';

  categoryOptions: string[] = [
    'Technology',
    'Learning',
    'Business',
    'Personal',
    'Other'
  ];


  statusOptions: string[] = [
    'New',
    'In Progress',
    'Completed',
    'Cancelled'
  ];

  priorityOptions = [
    {
      value: 'Low'
    },
    {
      value: 'Medium'
    },
    {
      value: 'High'
    }
  ];

  ngOnInit(): void {

    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.route.queryParamMap.subscribe(params => {

      const idParam = params.get('id');

      console.log('QUERY ID:', idParam);

      if (idParam) {

        const id = Number(idParam);

        if (id > 0) {

          this.editId = id;
          this.isEditMode = true;

          console.log('EDIT MODE ID:', id);

          this.loadIdeaForEdit(id);

        }

      } else {

        this.editId = null;
        this.isEditMode = false;

        console.log('CREATE MODE');

        this.resetForm();
      }

    });
  }


  loadIdeaForEdit(id: number): void {



    this.ideaService.getIdeaById(id).subscribe({

      next: (idea: IdeaResponse) => {

        this.title = idea.title ?? '';

        this.description = idea.description ?? '';

    
        this.selectedStatus = idea.status ?? 'New';

  
        this.selectedPriority = idea.priority ?? 'Low';

        
        if (this.categoryOptions.includes(idea.category)) {

          this.selectedCategory = idea.category;
          this.customcategory = '';

        } else {

          this.selectedCategory = 'Select';
          this.customcategory = idea.category ?? '';

        }

        if (idea.planDateTime) {

          const [datePart, timePart] =
            idea.planDateTime.split('T');

          this.selectedDate = datePart ?? '';

          this.selectedTime = timePart
            ? timePart.substring(0, 5)
            : '';

        } else {

          this.selectedDate = '';
          this.selectedTime = '';

        }

        this.reminderEnabled = idea.reminderEnabled ?? false;

        if (idea.reminderDateTime) {

          const [reminderDatePart, reminderTimePart] =
            idea.reminderDateTime.split('T');

          this.reminderDate = reminderDatePart ?? '';

          this.reminderTime = reminderTimePart
            ? reminderTimePart.substring(0, 5)
            : '';

        } else {

          this.reminderDate = '';
          this.reminderTime = '';
        }

        this.cdr.detectChanges();
      },
    });
  }


  openCategory(): void {

    this.showCategoryDropdown =
      !this.showCategoryDropdown;

    this.showStatus = false;
  }

  selectCategory(option: string): void {

    this.selectedCategory = option;

    this.customcategory = '';

    this.showCategoryDropdown = false;
  }

  openStatus(): void {

    this.showStatus =
      !this.showStatus;

    this.showCategoryDropdown = false;
  }

  SelectedStatus(status: string): void {

    this.selectedStatus = status;

    this.showStatus = false;
  }

  selectPriority(value: string): void {

    this.selectedPriority = value;
  }
savePersonalInfo(): void {

  if (!this.title.trim()) {
    alert('Please enter Idea Title');
    return;
  }

  if (!this.description.trim()) {
    alert('Please enter Description');
    return;
  }

  const category = this.customcategory.trim()
    ? this.customcategory.trim()
    : this.selectedCategory;

  if (!category || category === 'Select') {
    alert('Please select or enter Category');
    return;
  }

  if (!this.selectedDate) {
    alert('Please select Plan Date');
    return;
  }

  if (!this.selectedTime) {
    alert('Please select Event Time');
    return;
  }

  if (!this.selectedPriority) {
    alert('Please select Priority');
    return;
  }

  if (this.reminderEnabled) {

    if (!this.reminderDate) {
      alert('Please select Reminder Date');
      return;
    }

    if (!this.reminderTime) {
      alert('Please select Reminder Time');
      return;
    }
  }

  const planDateTime =
    `${this.selectedDate}T${this.selectedTime}`;

  const reminderDateTime =
    this.reminderEnabled
      ? `${this.reminderDate}T${this.reminderTime}`
      : null;

  if (
    this.isEditMode &&
    this.editId !== null
  ) {

    const updateRequest = {

      title: this.title.trim(),

      description: this.description.trim(),

      planDateTime: planDateTime,

      category: category,

      priority: this.selectedPriority,

      status: this.selectedStatus,

      reminderEnabled: this.reminderEnabled,

      reminderDateTime: reminderDateTime

    };

    console.log(
      'UPDATE REQUEST:',
      updateRequest
    );

    this.ideaService
      .updateIdea(
        this.editId,
        updateRequest
      )
      .subscribe({

        next: (response) => {

          console.log(
            'UPDATE SUCCESS:',
            response
          );

          alert(
            'Idea updated successfully'
          );

          this.router.navigate([
            '/ideas'
          ]);
        },

        error: (error) => {

          console.error(
            'UPDATE ERROR:',
            error
          );

          alert(
            error.error?.message ||
            'Failed to update idea'
          );
        }

      });

    return;
  }

  const createRequest = {

    title: this.title.trim(),

    description: this.description.trim(),

    planDateTime: planDateTime,

    category: category,

    priority: this.selectedPriority,

    reminderEnabled: this.reminderEnabled,

    reminderDateTime: reminderDateTime

  };

  console.log(
    'CREATE REQUEST:',
    createRequest
  );

  this.ideaService
    .createIdea(createRequest)
    .subscribe({

      next: (response) => {

        console.log(
          'CREATE SUCCESS:',
          response
        );

        alert(
          'Idea created successfully'
        );

        this.router.navigate([
          '/home'
        ]);
      },

      error: (error) => {

        console.error(
          'CREATE ERROR:',
          error
        );

        alert(
          error.error?.message ||
          'Failed to create idea'
        );
      }

    });
}

  resetForm(): void {

    this.title = '';

    this.description = '';

    this.selectedCategory = 'Select';

    this.customcategory = '';

    this.selectedDate = '';

    this.selectedTime = '';

    this.selectedStatus = 'New';

    this.selectedPriority = 'Low';

    this.showCategoryDropdown = false;

    this.showStatus = false;
  }

 
  cancelPersonalInfo(): void {

    this.router.navigate([
      '/ideas'
    ]);
  }
}