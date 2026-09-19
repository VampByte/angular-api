import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-user-view',
  styleUrl: './user-view.css',
  templateUrl: './user-view.html',
})
export class UserView {
  id = input<string>();
}
