import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../services/user';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile {

  userId!: number;

  user: any = {};

  editMode = false;

  constructor(
    private userService: UserService,
    private router: Router
  ) {
  }

  ngOnInit() {

    const id = localStorage.getItem('userId');

    if (id) {

      this.userId = Number(id);

      this.loadProfile();

    } else {

      this.router.navigate(['/login']);

    }
  }

  loadProfile() {

    this.userService.getUserById(this.userId).subscribe({

      next: (response) => {

        this.user = response;

      },

      error: (error) => {

        console.log(error);

        alert('Unable to load profile');

      }

    });
  }

  editProfile() {

    this.editMode = true;

  }

  updateProfile() {

    this.userService.updateUser(
      this.userId,
      this.user
    ).subscribe({

      next: (response) => {

        this.user = response;

        this.editMode = false;

        alert('Profile updated successfully');

      },

      error: (error) => {

        console.log(error);

        alert('Profile update failed');

      }

    });
  }

  cancelEdit() {

    this.editMode = false;

    this.loadProfile();

  }

  getInitials() {

    if (!this.user.name) {

      return 'ER';

    }

    let names = this.user.name.split(' ');

    if (names.length >= 2) {

      return (
        names[0][0] +
        names[1][0]
      ).toUpperCase();

    }

    return names[0].substring(0, 2).toUpperCase();

  }

  logout() {

    localStorage.removeItem('userId');

    this.router.navigate(['/login']);

  }

}