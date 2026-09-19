import { Component, computed, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-user-form',
  styleUrl: './user-form.css',
  templateUrl: './user-form.html',
})
export class UserForm {
  id = input<string>();
  isEditMode = computed(() => !!this.id());
}
