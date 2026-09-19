import { Component, effect, inject, input, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { IUser } from '../../interfaces/user.interface';
import { UsersService } from '../../services/users.service';

@Component({
	imports: [RouterLink],
	selector: 'app-user-view',
	styleUrl: './user-view.css',
	templateUrl: './user-view.html',
})
export class UserView {
	private usersService = inject(UsersService);
	private router = inject(Router);

	id = input<string>();

	user = signal<IUser | null>(null);
	loading = signal(true);
	error = signal<string | null>(null);

	constructor() {
		effect(() => {
			const userId = this.id();
			if (userId) {
				this.loadUser(userId);
			}
		});
	}

	private async loadUser(userId: string): Promise<void> {
		this.loading.set(true);
		this.error.set(null);
		try {
			const user = await this.usersService.getById(userId);
			this.user.set(user);
		} catch {
			this.error.set('No se pudo cargar el usuario.');
		} finally {
			this.loading.set(false);
		}
	}

	async onDelete(): Promise<void> {
		const user = this.user();
		if (!user) {
			return;
		}

		const confirm = await Swal.fire({
			title: `¿Eliminar a ${user.first_name} ${user.last_name}?`,
			text: `Vamos a eliminar el usuario ${user.first_name} ${user.last_name}. Esta acción no se puede deshacer.`,
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Sí, eliminar',
			cancelButtonText: 'Cancelar',
			confirmButtonColor: '#dc2626',
		});

		if (!confirm.isConfirmed) {
			return;
		}

		try {
			await this.usersService.delete(user._id);
			await Swal.fire({
				title: 'Eliminado',
				text: 'El usuario se ha eliminado correctamente.',
				icon: 'success',
			});
			this.router.navigate(['/home']);
		} catch {
			await Swal.fire({
				title: 'Error',
				text: 'No se pudo eliminar el usuario. Inténtalo de nuevo.',
				icon: 'error',
			});
		}
	}
}
