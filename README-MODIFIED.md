# EzyRide - Modified UI

This version separates the public welcome page from the authenticated dashboard.

## User flow

- `/` - public EzyRide welcome / landing page
- `/login` - existing login page
- `/register` - existing registration page
- `/dashboard` - authenticated EzyRide dashboard matching the supplied dashboard reference
- `/profile` - existing profile page

## Dashboard updates

The dashboard now includes:

- EzyRide top navigation and profile avatar
- Personalized greeting
- Simulated live route map
- RideMate recommendation card
- Recent locations
- Favourites
- Pickup and destination fields
- Date, time and passenger selectors
- Search Ride action
- Quick actions: Find Ride, RideMate, Live Map, Chat and EzyTalk
- Upcoming ride card with View and Track actions
- Responsive desktop/tablet/mobile layout

## Important

The map and ride data are demo UI data. Existing backend files are included unchanged from the project version used for the UI update.

## Run frontend

```bash
cd ezyride-frontend
npm install
ng serve
```

Use a Node.js version supported by the Angular version declared in `package.json`.
