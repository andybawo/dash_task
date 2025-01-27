import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  loginObj: any = {
    emailId: '',
    password: '',
  };

  router = inject(Router);

  onLogout() {
    // Clear the login data if it's stored anywhere (e.g., session or local storage)
    // Example: sessionStorage.removeItem('user'); (if you're using session storage)

    // Clear login form data (optional, if you want to reset it on logout)
    this.loginObj = {
      username: '',
      password: '',
    };

    // Redirect the user to the login page (or any other page)
    this.router.navigateByUrl('/login'); // assuming '/login' is the login page
  }
}
