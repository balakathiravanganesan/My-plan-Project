import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';

import {
  AuthService,
  RegisterRequest
} from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,

  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule,
    RouterLink
  ],

  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  hidePassword = true;
  hideconformpassword = true;

  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  registerForm = new FormGroup({

    Email: new FormControl('', [
      Validators.required
    ]),

    password: new FormControl('', [
      Validators.required
    ]),

    fullname: new FormControl('', [
      Validators.required
    ]),

    confirmpassword: new FormControl('', [
      Validators.required
    ])

  });

  register(): void {

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const password =
      this.registerForm.value.password ?? '';

    const confirmPassword =
      this.registerForm.value.confirmpassword ?? '';


    if (password !== confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    const request: RegisterRequest = {

      name:
        this.registerForm.value.fullname ?? '',

      email:
        this.registerForm.value.Email ?? '',

      password:
        password

    };

    this.authService.register(request).subscribe({

      next: (response) => {

        localStorage.setItem(
          'token',
          response.token
        );

        localStorage.setItem(
          'name',
          response.name
        );

        localStorage.setItem(
          'email',
          response.email
        );

        this.router.navigate(['/login']);
      },

      error: (error) => {

        console.error(error);

        this.errorMessage =
          error.error?.message ||
          'Registration failed.';

      }

    });
  }
}