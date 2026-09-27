import { Routes } from '@angular/router';
import { Welcome } from './welcome/welcome';
import { Login } from './login/login';
import { Register } from './register/register';
import { Profile } from './profile/profile';
import { Dashboard } from './dashboard/dashboard';
import { Search } from './search/search';
import { Ridemate } from './ridemate/ridemate';
import { Chat } from './chat/chat';
import { Eytalk } from './eytalk/eytalk';

export const routes: Routes = [
  { path: '', component: Welcome },
  { path: 'welcome', component: Welcome },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'dashboard', component: Dashboard },
  { path: 'search', component: Search },
  { path: 'ridemate', component: Ridemate },
  { path: 'chat', component: Chat },
  { path: 'eytalk', component: Eytalk },
  { path: 'profile', component: Profile },
  { path: '**', redirectTo: '' }
];
