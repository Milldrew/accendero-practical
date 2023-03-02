import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../types/core.types';

@Component({
  selector: 'auth-panel',
  templateUrl: './auth-panel.component.html',
  styleUrls: ['./auth-panel.component.scss'],
})
export class AuthPanelComponent {
  constructor(public userService: UserService, public router: Router) {}
  currentUsername: User['username'] | null;
  ngDoCheck() {
    if (this.userService.currentUser) {
      this.currentUsername = this.userService.currentUser.username;
    } else {
      this.currentUsername = null;
    }
  }
  logout() {
    this.userService.logout();
  }
  login() {
    this.router.navigate(['/login']);
  }
  signUp() {
    this.router.navigate(['/sign-up']);
  }
  deleteAccount() {
    this.userService.deleteAccount();
  }
}
