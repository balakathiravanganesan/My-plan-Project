import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_CONFIG } from '../config/apiconfig';

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) {}

  register(
    data: RegisterRequest
  ): Observable<AuthResponse> {

    return this.http.post<AuthResponse>(
      API_CONFIG.AUTH.REGISTER,
      data
    );
  }

  login(
    data: LoginRequest
  ): Observable<AuthResponse> {

    return this.http.post<AuthResponse>(
      API_CONFIG.AUTH.LOGIN,
      data
    );
  }

}