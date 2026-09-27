import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { Header } from '../shared/header/header';
import { AuthService } from '../services/auth';
import { UserService } from '../services/user';


@Component({
 selector: 'app-profile',
 imports: [
  FormsModule,
  CommonModule,
  Header
 ],
 templateUrl: './profile.html',
 styleUrl: './profile.css'
})
export class Profile implements OnInit {

 /*
  * Dynamically generate initials from
  * the currently logged-in user's name.
  *
  * Example:
  * Dhiraj Kumar -> DK
  * Priya Sharma -> PS
  * Rahul Kumar -> RK
  */
 get initials(): string {

  const name = this.user?.name || 'EzyRide User';

  return name
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part: string) =>
          part.charAt(0).toUpperCase()
      )
      .join('') || 'EU';
 }


 userId!: number;

 user: any = {};

 editMode = false;


 stats = {
  rating: '4.9★',
  trips: 48,
  ridemates: 12
 };


 menu = [
  'Personal Information',
  'Ride Preferences',
  'Notifications',
  'Privacy',
  'Safety',
  'Help & Support',
  'EzyTalk'
 ];


 constructor(
     private auth: AuthService,
     private users: UserService,
     private router: Router
 ) {}


 ngOnInit(): void {

  const id = this.auth.getUserId();

  /*
   * If nobody is logged in,
   * send the user to Login.
   */
  if (id === null) {

   this.router.navigate(['/login']);

   return;
  }


  this.userId = id;

  this.loadProfile();
 }


 /*
  * Load the profile of the CURRENT logged-in user.
  */
 loadProfile(): void {

  this.users.getUserById(this.userId).subscribe({

   next: (u) => {

    this.user = u;

    /*
     * Keep the latest user information
     * inside AuthService.
     */
    this.auth.setLoggedUser({
     ...u,
     id: this.userId
    });

    this.makeStats();
   },


   error: (e) => {

    console.error(e);

    /*
     * If backend request fails,
     * use the currently logged-in user.
     */
    this.user =
        this.auth.getCurrentUser() || {};

    this.makeStats();
   }

  });
 }


 /*
  * Generate demo statistics based on
  * the logged-in user's ID.
  */
 makeStats(): void {

  const id = this.userId || 1;

  const trips = 35 + (id % 40);

  this.stats = {

   rating:
       (4.5 + (id % 5) / 10)
           .toFixed(1) + '★',

   trips: trips,

   ridemates:
       8 + (id % 15)

  };
 }


 /*
  * Enable profile editing.
  */
 editProfile(): void {

  this.editMode = true;
 }


 /*
  * Save the CURRENT user's profile.
  */
 updateProfile(): void {

  this.users
      .updateUser(this.userId, this.user)
      .subscribe({

       next: (u) => {

        this.user = u;

        this.auth.setLoggedUser({
         ...u,
         id: this.userId
        });

        this.editMode = false;

        alert(
            'Profile updated successfully'
        );
       },


       error: (e) => {

        console.error(e);

        alert(
            'Profile update failed'
        );
       }

      });
 }


 /*
  * Cancel editing and reload
  * the original profile.
  */
 cancelEdit(): void {

  this.editMode = false;

  this.loadProfile();
 }


 /*
  * Open profile menu options.
  */
 open(item: string): void {

  if (item === 'EzyTalk') {

   this.router.navigate(['/eytalk']);

  } else {

   alert(
       `${item} settings are ready for ${
           this.user?.name || 'your account'
       }.`
   );

  }
 }


 /*
  * Logout current user.
  */
 logout(): void {

  this.auth.logout();

  this.router.navigate(['/login']);
 }

}