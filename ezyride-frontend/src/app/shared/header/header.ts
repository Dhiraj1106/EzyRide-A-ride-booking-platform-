import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService, LoggedUser } from '../../services/auth';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header implements OnInit {
  user: LoggedUser | null = null;

  constructor(public auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.user = this.auth.getCurrentUser();
    this.auth.currentUser$.subscribe(user => this.user = user);
  }

  get initials(): string {
    const name = this.user?.name?.trim() || 'EzyRide User';
    return name.split(/\s+/).slice(0, 2).map(p => p.charAt(0)).join('').toUpperCase();
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
