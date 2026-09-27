import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Header } from '../shared/header/header';
import { AuthService } from '../services/auth';
import { UserService } from '../services/user';

@Component({ selector:'app-dashboard', imports:[FormsModule,Header], templateUrl:'./dashboard.html', styleUrl:'./dashboard.css' })
export class Dashboard implements OnInit {
  userName='EzyRide User'; userId:number|null=null;
  pickup='Patia, Bhubaneswar'; destination='Cuttack'; rideDate='Today'; rideTime='10:30 AM'; passengers=1;
  recentLocations=[{title:'KIIT Square',subtitle:'Patia, Bhubaneswar'},{title:'Cuttack Bus Stand',subtitle:'Cuttack, Odisha'},{title:'Bhubaneswar Railway Station',subtitle:'Master Canteen'}];
  favourites=[{title:'Home',subtitle:'Patia, Bhubaneswar'},{title:'Work',subtitle:'Jaydev Vihar, Bhubaneswar'},{title:'Campus',subtitle:'KIIT University'}];
  quickActions=[{label:'Find Ride',icon:'🚕'},{label:'RideMate',icon:'🤝'},{label:'Live Map',icon:'🗺️'},{label:'Chat',icon:'💬'},{label:'EzyTalk',icon:'🤖'}];

  constructor(private auth:AuthService,private users:UserService,private router:Router){}

  ngOnInit(){
    const id=this.auth.getUserId();
    if(id===null){this.router.navigate(['/login']);return;}
    this.userId=id;
    const stored=this.auth.getCurrentUser();
    this.userName=stored?.name||'EzyRide User';
    this.users.getUserById(id).subscribe({next:(u)=>{if(u?.name){this.userName=u.name; this.auth.setLoggedUser({...u,id});}},error:()=>{}});
  }
  useRecent(l:any){this.destination=l.title;}
  chooseFavourite(l:any){this.pickup=l.subtitle;}
  setPickup(){this.pickup=this.pickup==='Patia, Bhubaneswar'?'KIIT Square, Patia':'Patia, Bhubaneswar';}
  setDestination(){this.destination=this.destination==='Cuttack'?'Cuttack Bus Stand':'Cuttack';}
  searchRide(){this.router.navigate(['/search'],{queryParams:{pickup:this.pickup,destination:this.destination,date:this.rideDate,time:this.rideTime,passengers:this.passengers}});}
  quickAction(a:string){if(a==='Find Ride')this.searchRide();else if(a==='RideMate')this.router.navigate(['/ridemate']);else if(a==='Chat')this.router.navigate(['/chat']);else if(a==='EzyTalk')this.router.navigate(['/eytalk']);else alert('Live Map is using simulated demo data.');}
  seeMatches(){this.router.navigate(['/ridemate']);}
  openEzyTalk(){this.router.navigate(['/eytalk']);}
  viewUpcoming(){alert(`Upcoming ride for ${this.userName}: Bhubaneswar → Cuttack, Today at ${this.rideTime}.`);}
  trackUpcoming(){alert(`Tracking ${this.userName}'s upcoming ride.`);}
}
