# EzyRide dynamic video-style update

This version updates the frontend to follow the uploaded EzyRide reference video and makes the logged-in user dynamic.

## Dynamic login/profile behavior
- Login response is stored as the current EzyRide user (id, name, email, phone, role).
- Dashboard greeting and header avatar use the logged-in user's name.
- Profile calls `GET /api/users/{loggedInUserId}` so the displayed profile belongs to the current login.
- Profile edits call `PUT /api/users/{loggedInUserId}` and refresh the session user.
- Logout clears the current user and returns to `/login`.
- Search, RideMate, Chat and EzyTalk pages use the current logged-in user's name.

## Video-style routes
- `/dashboard` - home/dashboard
- `/search` - trip and ride selection + available driver
- `/ridemate` - RideMate matches
- `/chat` - rider/support chat UI
- `/eytalk` - EzyTalk support assistant
- `/profile` - current user's profile, stats, settings and logout

## Backend change
`UserController` now allows requests from `http://localhost:4200` so the profile GET/PUT calls work from Angular.

## Run
Frontend:
```bash
cd ezyride-frontend
npm install
ng serve
```
Backend:
```bash
cd ezyride_backend
mvn spring-boot:run
```

Backend must be available at `http://localhost:8080` and Angular at `http://localhost:4200`.

### Important
The current backend uses a simple email/password login and does not yet issue JWT tokens. The UI therefore associates the current session with the user id returned by the login endpoint. For production-grade security, JWT/session authorization should also be added to backend user endpoints so a user cannot request another user's id directly.
