import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { User } from '../model/class/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterLink, RouterOutlet, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  userList: User[] = [];
  user: any;
  loginObj: Partial<User> = { email: '', password: '' };
  loggedInUser: User | null = null; // Store the currently logged-in user

  sidebarOpen = false;

  ngOnInit(): void {
    const localData = localStorage.getItem('doctask');
    if (localData != null) {
      this.userList = JSON.parse(localData);
    }

    // Fetch the userId of the logged-in user
    const currentUserId = localStorage.getItem('currentUserId');
    if (currentUserId != null) {
      // Find the logged-in user by userId
      this.loggedInUser =
        this.userList.find(
          (user) => user.userId == JSON.parse(currentUserId)
        ) || null;
    }
  }

  // loginObj: any = {
  //   emailId: '',
  //   password: '',
  // };

  router = inject(Router);

  onLogout() {
    // Clear the login data if it's stored anywhere (e.g., session or local storage)
    // Example: sessionStorage.removeItem('user'); (if you're using session storage)

    // Clear login form data (optional, if you want to reset it on logout)
    this.loginObj = {
      email: '',
      password: '',
    };

    // Redirect the user to the login page (or any other page)
    this.router.navigateByUrl('/login'); // assuming '/login' is the login page
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }
}
