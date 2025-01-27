import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  imports: [FormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
})
export class ResetPasswordComponent {
  isEmailVerified: boolean = true;

  emailVerify: string = '';
  newPassword: string = '';

  router = inject(Router);

  onVerifyEmail() {
    const isLocalData = localStorage.getItem('doctask');
    if (isLocalData != null) {
      const users = JSON.parse(isLocalData);

      const isUserFound = users.find(
        (user: any) => user.emailId === this.emailVerify
      );
      if (isUserFound) {
        this.isEmailVerified = false;
        alert('Email verified. Reset Password');
      } else {
        alert('Email not Found');
      }
    }
  }

  onResetPassword() {
    const isLocalData = localStorage.getItem('doctask');
    if (isLocalData != null) {
      const users = JSON.parse(isLocalData);

      const userIndex = users.findIndex(
        (user: any) => user.emailId === this.emailVerify
      );
      if (userIndex !== -1) {
        users[userIndex].password = this.newPassword;
        localStorage.setItem('doctask', JSON.stringify(users));
        alert('Password reset successful');
        this.router.navigateByUrl('login');
      } else {
        alert('Error, try again');
      }
    }
  }
}
