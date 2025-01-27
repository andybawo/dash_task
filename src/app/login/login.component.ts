import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  Router,
  RouterLink,
  RouterModule,
  RouterOutlet,
} from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink, RouterOutlet, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  router = inject(Router);

  isLoginView: boolean = true;

  userRegisterObj: any = {
    emailId: '',
    password: '',
  };

  loginObj: any = {
    emailId: '',
    password: '',
  };

  onRegister() {
    debugger;
    const isLocalData = localStorage.getItem('doctask');
    if (isLocalData != null) {
      const localArray = JSON.parse(isLocalData);
      localArray.push(this.userRegisterObj);
      localStorage.setItem('doctask', JSON.stringify(localArray));
    } else {
      const localArray = [];
      localArray.push(this.userRegisterObj);
      localStorage.setItem('doctask', JSON.stringify(localArray));
    }
    alert('Registration Successful');
    this.router.navigateByUrl('/');
  }

  onLogin() {
    const isLocalData = localStorage.getItem('doctask');
    if (isLocalData != null) {
      const users = JSON.parse(isLocalData);

      const isUserFound = users.find(
        (m: any) =>
          m.emailId == this.loginObj.emailId &&
          m.password == this.loginObj.password
      );
      if (isUserFound != undefined) {
        this.router.navigateByUrl('/dashboard');
      } else {
        alert('Email or Password not found');
      }
    }
  }

  onReset() {
    this.router.navigateByUrl('reset-password');
  }
}
