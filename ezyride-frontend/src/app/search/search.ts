import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Header } from '../shared/header/header';
import { AuthService } from '../services/auth';

@Component({selector:'app-search',imports:[FormsModule,Header],templateUrl:'./search.html',styleUrl:'./search.css'})
export class Search implements OnInit {
  pickup='Bhubaneswar Station'; destination='KIIT Square'; date='Today'; time='10:20 AM'; passengers=3; selected='';
  rides=[{name:'Bike',icon:'🏍️',description:'Quickest through traffic',meta:'4 min away · 1 seat',fare:90},{name:'Auto',icon:'🛺',description:'Everyday value ride',meta:'6 min away · 3 seats',fare:110},{name:'Cab Economy',icon:'🚕',description:'Comfortable AC hatchback',meta:'5 min away · 4 seats',fare:150},{name:'Cab Premium',icon:'🚘',description:'Top-rated drivers, sedan',meta:'7 min away · 4 seats',fare:220}];
  driver={name:'Arjun Patnaik',initials:'AP',rating:4.6,trips:64,car:'Honda Activa · Grey',fare:90};
  userName='EzyRide User';
  constructor(private auth:AuthService,private route:ActivatedRoute,private router:Router){}
  ngOnInit(){if(!this.auth.isLoggedIn()){this.router.navigate(['/login']);return;} this.userName=this.auth.getCurrentUser()?.name||'EzyRide User'; this.route.queryParams.subscribe(p=>{this.pickup=p['pickup']||this.pickup;this.destination=p['destination']||this.destination;this.date=p['date']||this.date;this.time=p['time']||this.time;this.passengers=Number(p['passengers']||this.passengers);});}
  selectRide(name:string){this.selected=name;}
  requestRide(){if(!this.selected){alert('Please select a ride first.');return;} alert(`${this.selected} requested by ${this.userName}. Driver ${this.driver.name} will be notified.`);}
  editTrip(){this.router.navigate(['/dashboard']);}
  findMatches(){this.router.navigate(['/ridemate']);}
}
