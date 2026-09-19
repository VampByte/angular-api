import { Component, OnInit, inject, signal } from '@angular/core';
import Swal from 'sweetalert2';
import { UserCard } from '../../components/user-card/user-card';
import { IUser } from '../../interfaces/user.interface';
import { UsersService } from '../../services/users.service';

@Component({
  imports: [UserCard],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home implements OnInit {
  private usersService = inject(UsersService);

  users = signal<IUser[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);

  async ngOnInit(): Promise<void> {
    await this.loadUsers();
  }

  private async loadUsers(): Promise<void> {
    this.loading.set(true);
    this.error.set(null);
    try {
      const data = await this.usersService.getAll();
      this.users.set(data);
    } catch {
      this.error.set('No se pudo cargar el listado de usuarios.');
    } finally {
      this.loading.set(false);
    }
  }

  async onDelete(user: IUser): Promise<void> {
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
      this.users.update((list) => list.filter((u) => u._id !== user._id));
      await Swal.fire({
        title: 'Eliminado',
        text: 'El usuario se ha eliminado correctamente.',
        icon: 'success',
      });
    } catch {
      await Swal.fire({
        title: 'Error',
        text: 'No se pudo eliminar el usuario. Inténtalo de nuevo.',
        icon: 'error',
      });
    }
  }
}
