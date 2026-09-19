import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { IUser } from '../interfaces/user.interface';	
import { IUsersResponse } from '../interfaces/user-response.interface';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private http = inject(HttpClient);
  private readonly baseUrl = 'https://peticiones.online/api/users';

  async getAll(): Promise<IUser[]> {
    const response = await firstValueFrom(this.http.get<IUsersResponse>(this.baseUrl));
    return response.results;
  }

  async getById(userId: string): Promise<IUser> {
    return firstValueFrom(this.http.get<IUser>(`${this.baseUrl}/${userId}`));
  }

  async create(user: Partial<IUser>): Promise<IUser> {
    return firstValueFrom(this.http.post<IUser>(this.baseUrl, user));
  }

  async update(userId: string, user: Partial<IUser>): Promise<IUser> {
    return firstValueFrom(this.http.put<IUser>(`${this.baseUrl}/${userId}`, user));
  }

  async delete(userId: string): Promise<IUser> {
    return firstValueFrom(this.http.delete<IUser>(`${this.baseUrl}/${userId}`));
  }
}
