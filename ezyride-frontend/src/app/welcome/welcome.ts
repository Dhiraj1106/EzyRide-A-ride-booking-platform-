import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-welcome',
  imports: [RouterLink],
  templateUrl: './welcome.html',
  styleUrl: './welcome.css'
})
export class Welcome {
  features = [
    { icon: '🚕', title: 'Easy rides', text: 'Book your ride in a few simple steps.' },
    { icon: '🤝', title: 'RideMate', text: 'Find people heading your way and share the ride.' },
    { icon: '🛡️', title: 'Ride with confidence', text: 'Keep your trip details and profile in one place.' }
  ];
}
