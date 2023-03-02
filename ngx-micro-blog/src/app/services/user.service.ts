import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateUserDTO, LoginDTO, User } from '../types/core.types';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  currentUser: User = {
    userId: '1',
    username: 'John',
  };

  /**
   * Used by the sign up form to create a new user
   */
  createUser(user: CreateUserDTO) {
    const currentUser = this.http
      .post<User>('/api/users', user)
      .subscribe((user) => {
        this.currentUser = user;
      });
  }

  /**
   * used to log in a user
   */
  login(loginDTO: LoginDTO) {
    this.currentUser = {
      userId: '1',
      username: loginDTO.email,
    };
  }
}
