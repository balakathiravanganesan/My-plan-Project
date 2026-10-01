import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/apiconfig';

export interface CreateIdeaRequest {
  title: string;
  description: string;
  planDateTime: string;
  category: string;
  priority: string;
  reminderEnabled: boolean;
  reminderDateTime: string | null;
}

export interface UpdateIdeaRequest {
  title: string;
  description: string;
  planDateTime: string;
  category: string;
  priority: string;
  status: string;
  reminderEnabled: boolean;
  reminderDateTime: string | null;
}

export interface IdeaResponse {
  id: number;
  title: string;
  description: string;
  planDateTime: string;
  category: string;
  priority: string;
  status: string;
  isFavorite: boolean;
  reminderEnabled: boolean;
  reminderDateTime: string | null;
}

export interface DashboardResponse {
  totalIdeas: number;
  pending: number;
  implemented: number;
  favorites: number;
}

@Injectable({
  providedIn: 'root'
})
export class IdeaService {

  constructor(private http: HttpClient) {}

  createIdea(data: CreateIdeaRequest): Observable<IdeaResponse> {
    return this.http.post<IdeaResponse>(
      API_CONFIG.IDEA.CREATE,
      data
    );
  }

  getAllIdeas(): Observable<IdeaResponse[]> {
    return this.http.get<IdeaResponse[]>(
      API_CONFIG.IDEA.GET_ALL
    );
  }

  getIdeaById(id: number): Observable<IdeaResponse> {
    return this.http.get<IdeaResponse>(
      API_CONFIG.IDEA.GET_BY_ID(id)
    );
  }

  getFavorites(): Observable<IdeaResponse[]> {
    return this.http.get<IdeaResponse[]>(
      API_CONFIG.IDEA.GET_FAVORITES
    );
  }

  getTodayIdeas(): Observable<IdeaResponse[]> {
    return this.http.get<IdeaResponse[]>(
      API_CONFIG.IDEA.GET_TODAY
    );
  }

  updateIdea(
    id: number,
    data: UpdateIdeaRequest
  ): Observable<IdeaResponse> {
    return this.http.put<IdeaResponse>(
      API_CONFIG.IDEA.UPDATE(id),
      data
    );
  }

  deleteIdea(id: number): Observable<any> {
    return this.http.delete(
      API_CONFIG.IDEA.DELETE(id)
    );
  }

  toggleFavorite(id: number): Observable<any> {
    return this.http.patch(
      API_CONFIG.IDEA.FAVORITE(id),
      {}
    );
  }

  getDashboard(): Observable<DashboardResponse> {
    return this.http.get<DashboardResponse>(
      API_CONFIG.IDEA.DASHBOARD
    );
  }
}