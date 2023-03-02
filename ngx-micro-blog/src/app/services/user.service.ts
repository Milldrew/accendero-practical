import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateUserDTO, LoginDTO, User } from '../types/core.types';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  domain = environment.apiDomain;
  constructor(private http: HttpClient) {}
  currentUser: User;

  /**
   * Used by the sign up form to create a new user
   */
  createUser(user: CreateUserDTO) {
    const currentUser = this.http
      .post<User>(this.domain + '/api/user', user)
      .subscribe((user) => {
        this.currentUser = user;
      });
  }

  /**
   * used to log in a user
   */
  login(loginDTO: LoginDTO) {
    this.http.post<User>(this.domain + '/api/user/login', loginDTO).subscribe(
      (user) => {
        this.currentUser = user;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
