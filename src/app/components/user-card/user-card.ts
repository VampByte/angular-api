import { Component, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-user-card',
  styleUrl: './user-card.css',
  templateUrl: './user-card.html',
})
export class UserCard {
  name = input('Nombre de usuario');
  email = input('correo@ejemplo.com');
  avatarUrl = input('https://i.pravatar.cc/150');
}
