import { IUser } from '../interfaces/user.interface';	

export interface IUsersResponse {
	page: number;
	per_page: number;
	total: number;
	total_pages: number;
	results: IUser[];
}