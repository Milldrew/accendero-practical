import { Injectable } from '@angular/core';
import { User } from '../types/core.types';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  currentUser: User = {
    userId: '1',
    username: 'John',
  };
}
