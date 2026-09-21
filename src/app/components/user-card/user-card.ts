import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IUser } from '../../interfaces/user.interface';

@Component({
	imports: [RouterLink],
	selector: 'app-user-card',
	styleUrl: './user-card.css',
	templateUrl: './user-card.html',
})
export class UserCard {
	user = input.required<IUser>();
	delete = output<void>();

	onDeleteClick(): void {
		this.delete.emit();
	}
}
