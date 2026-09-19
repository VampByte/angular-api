import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { UserView } from './pages/user-view/user-view';
import { UserForm } from './pages/user-form/user-form';
import { NotFound } from './pages/not-found/not-found';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: Home },
  { path: 'user/:id', component: UserView },
  { path: 'newuser', component: UserForm },
  { path: 'updateuser/:id', component: UserForm },
  { path: '**', component: NotFound },
];
