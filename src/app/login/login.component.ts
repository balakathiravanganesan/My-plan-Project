import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
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
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  hidePassword = true;

  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  loginForm = new FormGroup({

    Email: new FormControl('', [
      Validators.required
    ]),

    password: new FormControl('', [
      Validators.required
    ])

  });

  login(): void {

    if (this.loginForm.invalid) {

      this.loginForm.markAllAsTouched();

      return;
    }

    const request = {
      email: this.loginForm.value.Email ?? '',
      password: this.loginForm.value.password ?? ''
    };

    this.authService.login(request).subscribe({

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

  
        this.router.navigate(['/home']);
      },

      error: (error) => {

        console.error(error);

        this.errorMessage =
          error.error?.message ||
          'Invalid email or password.';
      }

    });
  }
}