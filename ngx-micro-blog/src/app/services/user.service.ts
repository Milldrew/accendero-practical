import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateUserDTO, LoginDTO, User } from '../types/core.types';

const STORAGE_KEY = 'micro-blog.session';

/** The API's message, or a plain fallback. */
export function errorText(e: unknown): string {
  const err = e as HttpErrorResponse;
  const message = err?.error?.message;
  return (Array.isArray(message) ? message[0] : message) || 'Something went wrong. Try again.';
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  domain = environment.apiDomain;
  /** Kept in this browser, so a reload no longer signs you out. */
  currentUser: User | null = UserService.restore();

  constructor(private http: HttpClient) {}

  private static restore(): User | null {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? 'null');
    } catch {
      return null;
    }
  }

  private remember(user: User) {
    this.currentUser = user;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } catch {
      // private mode: signed in for this visit only
    }
  }

  /** Used by the sign up form to create a new user (and sign them in). */
  createUser(user: CreateUserDTO): Observable<User> {
    return this.http.post<User>(this.domain + '/api/user', user).pipe(tap((u) => this.remember(u)));
  }

  /** Used to log in a user. */
  login(loginDTO: LoginDTO): Observable<User> {
    return this.http.post<User>(this.domain + '/api/user/login', loginDTO).pipe(tap((u) => this.remember(u)));
  }

  /** A throwaway account, so trying the app needs no email or password. */
  tryDemo(): Observable<User> {
    const id = Math.random().toString(36).slice(2, 8);
    return this.createUser({
      username: `Guest ${id}`,
      email: `guest-${id}@example.com`,
      password: Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2),
    });
  }

  logout() {
    this.currentUser = null;
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  }

  deleteAccount(): Observable<unknown> {
    return this.http
      .delete(this.domain + '/api/user/' + this.currentUser?.userId)
      .pipe(tap(() => this.logout()));
  }
}
