import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { IUser } from '../interfaces/user.interface';

interface UsersResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  results: IUser[];
}

@Injectable({ providedIn: 'root' })
export class UsersService {
  private http = inject(HttpClient);
  private readonly baseUrl = 'https://peticiones.online/api/users';

  async getAll(): Promise<IUser[]> {
    const response = await firstValueFrom(this.http.get<UsersResponse>(this.baseUrl));
    return response.results;
  }

  async getById(mongoId: string): Promise<IUser> {
    return firstValueFrom(this.http.get<IUser>(`${this.baseUrl}/${mongoId}`));
  }

  async create(user: Partial<IUser>): Promise<IUser> {
    return firstValueFrom(this.http.post<IUser>(this.baseUrl, user));
  }

  async update(mongoId: string, user: Partial<IUser>): Promise<IUser> {
    return firstValueFrom(this.http.put<IUser>(`${this.baseUrl}/${mongoId}`, user));
  }

  async delete(mongoId: string): Promise<IUser> {
    return firstValueFrom(this.http.delete<IUser>(`${this.baseUrl}/${mongoId}`));
  }
}
