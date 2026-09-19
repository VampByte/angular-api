import { Component } from '@angular/core';
import { UserCard } from '../../components/user-card/user-card';

@Component({
  imports: [UserCard],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {
  users = [
    { name: 'Ana Torres', email: 'ana.torres@mail.com', avatarUrl: 'https://i.pravatar.cc/150?img=47' },
    { name: 'Bruno García', email: 'bruno.garcia@mail.com', avatarUrl: 'https://i.pravatar.cc/150?img=12' },
    { name: 'Carla Díaz', email: 'carla.diaz@mail.com', avatarUrl: 'https://i.pravatar.cc/150?img=32' },
  ];
}
