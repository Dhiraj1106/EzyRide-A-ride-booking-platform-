import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth';

@Component({ selector:'app-login', imports:[FormsModule, RouterLink], templateUrl:'./login.html', styleUrl:'./login.css' })
export class Login {
  user={email:'',password:''};
  constructor(private authService:AuthService, private router:Router){}

  loginUser(){
    if(!this.user.email || !this.user.password){ alert('Please enter email and password'); return; }
    this.authService.loginUser(this.user).subscribe({
      next:(response:any)=>{
        this.authService.setLoggedUser(response);
        alert('Login successful');
        this.router.navigate(['/dashboard']);
      },
      error:(error)=>{ console.error(error); alert(error?.error?.message || 'Login failed. Please check your email and password.'); }
    });
  }
}
