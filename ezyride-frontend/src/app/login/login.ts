import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  user = {
    email: '',
    password: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  loginUser() {

    if(!this.user.email || !this.user.password) {
      alert('Please enter email and password');
      return;
    }

    this.authService.loginUser(this.user).subscribe({

    next: (response: any) => {

    console.log('Login successful');
    console.log(response);

    localStorage.setItem('userId', response.id);

    alert('Login successful');

    this.router.navigate(['/profile']);
  },

      error: (error) => {

        console.log(error);
        alert('Login failed');

      }

    });
  }
}