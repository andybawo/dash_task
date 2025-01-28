import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  Router,
  RouterLink,
  RouterModule,
  RouterOutlet,
} from '@angular/router';

import { User } from '../model/class/user';
@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink, RouterOutlet, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  isLoginView: boolean = true;

  userRegisterObj: User = new User();
  loginObj: Partial<User> = { email: '', password: '' };
  loggedInUser: User | null = null; // Store the currently logged-in user

  userList: User[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    const localData = localStorage.getItem('doctask');
    if (localData != null) {
      this.userList = JSON.parse(localData);
    }
    const currentUserId = localStorage.getItem('currentUserId');
    if (currentUserId != null) {
      // Find the logged-in user by userId
      this.loggedInUser =
        this.userList.find(
          (user) => user.userId == JSON.parse(currentUserId)
        ) || null;
    }
  }

  onRegister() {
    debugger;
    this.userRegisterObj.userId = this.userList.length + 1;
    this.userList.push(this.userRegisterObj);
    localStorage.setItem('doctask', JSON.stringify(this.userList));
    alert('User Successfully Registered');
    this.router.navigateByUrl('login');
  }

  onLogin() {
    const isUserFound = this.userList.find(
      (user) =>
        user.email == this.loginObj.email &&
        user.password == this.loginObj.password
    );
    if (isUserFound) {
      localStorage.setItem('currentUserId', JSON.stringify(isUserFound.userId));
      alert('Login Successful');
      this.router.navigateByUrl('/dashboard');
    } else {
      alert('Incorrect Passwor or Email');
    }
  }

  onReset() {
    this.router.navigateByUrl('reset-password');
  }
}
