import { Component, computed, inject, input, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { UsersService } from '../../services/users.service';

type FieldName = 'first_name' | 'last_name' | 'username' | 'email' | 'password' | 'image';

const REQUIRED_MESSAGES: Record<FieldName, string> = {
	first_name: 'El nombre es obligatorio.',
	last_name: 'El apellido es obligatorio.',
	username: 'El usuario es obligatorio.',
	email: 'El email es obligatorio.',
	password: 'La contraseña es obligatoria.',
	image: 'La URL de imagen es obligatoria.',
};

@Component({
	imports: [ReactiveFormsModule, RouterLink],
	selector: 'app-user-form',
	styleUrl: './user-form.css',
	templateUrl: './user-form.html',
})
export class UserForm {
	private fb = inject(FormBuilder);
	private usersService = inject(UsersService);
	private router = inject(Router);

	id = input<string>();
	isEditMode = computed(() => !!this.id());

	submitting = signal(false);

	form = this.fb.nonNullable.group({
		first_name: ['', [Validators.required]],
		last_name: ['', [Validators.required]],
		username: ['', [Validators.required]],
		email: ['', [Validators.required, Validators.email]],
		password: ['', [Validators.required]],
		image: ['', [Validators.required, Validators.pattern(/^https?:\/\/.+/)]],
	});

	fieldInvalid(name: FieldName): boolean {
		const control = this.form.controls[name];
		return control.invalid && (control.dirty || control.touched);
	}

	fieldErrorMessage(name: FieldName): string {
		const control = this.form.controls[name];
		if (control.hasError('required')) {
			return REQUIRED_MESSAGES[name];
		}
		if (control.hasError('email')) {
			return 'Ingresá un email válido.';
		}
		if (control.hasError('pattern')) {
			return 'Ingresá una URL válida (debe empezar con http:// o https://).';
		}
		return '';
	}

	async onSubmit(): Promise<void> {
		if (this.form.invalid) {
			this.form.markAllAsTouched();
			return;
		}

		this.submitting.set(true);
		const value = this.form.getRawValue();

		try {
			if (this.isEditMode()) {
				await this.usersService.update(this.id()!, value);
				await Swal.fire({
					title: 'Usuario actualizado',
					text: 'Los cambios se han guardado correctamente.',
					icon: 'success',
				});
			} else {
				await this.usersService.create(value);
				await Swal.fire({
					title: 'Usuario creado',
					text: 'El usuario se ha creado correctamente.',
					icon: 'success',
				});
			}
			this.router.navigate(['/home']);
		} catch {
			await Swal.fire({
				title: 'Error',
				text: this.isEditMode()
					? 'No se pudo actualizar el usuario. Inténtalo de nuevo.'
					: 'No se pudo crear el usuario. Inténtalo de nuevo.',
				icon: 'error',
			});
		} finally {
			this.submitting.set(false);
		}
	}
}
