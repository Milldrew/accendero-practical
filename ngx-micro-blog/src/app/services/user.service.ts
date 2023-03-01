import { Injectable } from '@angular/core';
import { CreateUserDTO, User } from '../types/core.types';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  currentUser: User = {
    userId: '1',
    username: 'John',
  };

  /**
   * Used by the sign up form to create a new user
   */
  createUser(user: CreateUserDTO) {
    const userId = Math.random().toString(36).substr(2, 9);
    this.currentUser = { userId, username: user.username };
  }
}
