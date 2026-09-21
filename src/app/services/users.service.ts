import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { IUser, IUsersResponse } from '../interfaces/user.interface';

interface IApiError {
	error: string;
}

@Injectable({ providedIn: 'root' })
export class UsersService {
	private http = inject(HttpClient);
	private readonly baseUrl = 'https://peticiones.online/api/users';

	async getAll(): Promise<IUser[]> {
		const response = await firstValueFrom(this.http.get<IUsersResponse>(this.baseUrl));
		console.log(`[UsersService] GET ${this.baseUrl} →`, response);
		return response.results;
	}

	// Get user by ID
	async getById(userId: string): Promise<IUser> {
		const url = `${this.baseUrl}/${userId}`;
		const response = await firstValueFrom(this.http.get<IUser | IApiError>(url));
		console.log(`[UsersService] GET ${url} →`, response);
		return this.assertOk(response);
	}

	// Crear usuario
	async create(user: Partial<IUser>): Promise<IUser> {
		console.log(`[UsersService] POST ${this.baseUrl} body:`, user);
		const response = await firstValueFrom(this.http.post<IUser | IApiError>(this.baseUrl, user));
		console.log(`[UsersService] POST ${this.baseUrl} →`, response);
		return this.assertOk(response);
	}

	// Actualizar usuario
	async update(userId: string, user: Partial<IUser>): Promise<IUser> {
		const url = `${this.baseUrl}/${userId}`;
		console.log(`[UsersService] PUT ${url} body:`, user);
		const response = await firstValueFrom(this.http.put<IUser | IApiError>(url, user));
		console.log(`[UsersService] PUT ${url} →`, response);
		return this.assertOk(response);
	}

	// Eliminar usuario
	async delete(userId: string): Promise<IUser> {
		const url = `${this.baseUrl}/${userId}`;
		const response = await firstValueFrom(this.http.delete<IUser | IApiError>(url));
		console.log(`[UsersService] DELETE ${url} →`, response);
		return this.assertOk(response);
	}

	// Esta API responde 200 OK incluso cuando falla (ej. id invalido),
	// devolviendo { error: "..." } en el body en vez de un status HTTP de error.
	// HttpClient solo rechaza en status no-2xx, asi que hay que detectar este
	// caso a mano y convertirlo en una excepcion real para que el resto de la
	// app pueda manejarlo con un simple try/catch.
	private assertOk<T>(response: T | IApiError): T {
		if (response && typeof response === 'object' && 'error' in response) {
			throw new Error((response as IApiError).error);
		}
		return response as T;
	}
}
