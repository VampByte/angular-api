import { Component } from '@angular/core';
import { UserCard } from '../../components/user-card/user-card';

@Component({
  imports: [UserCard],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {}
