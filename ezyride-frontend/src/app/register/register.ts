import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-register',
  imports: [FormsModule,RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  user = {
    name: '',
    email: '',
    password: '',
    phone: '',
    role: 'USER'
  };

  constructor(private authService: AuthService,private router: Router) {
  }

  registerUser() {

    this.authService.registerUser(this.user).subscribe({

      next: (response) => {
        console.log('Registration successful');
        console.log(response);
        alert('Registration successful');
        this.user = {
           name: '',
    email: '',
    password: '',
    phone: '',
    role: ''
        }

        this.router.navigate(['/login']);
      },

      error: (error) => {
        console.log(error);
        alert('Registration failed');
      }

    });
  }
}