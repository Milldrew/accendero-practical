import { CreateUserDTO } from '../types/core.types';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';

import { Router } from '@angular/router';
import { errorText, UserService } from '../services/user.service';
import { Observable } from 'rxjs';

import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  error = '';
  busy = false;

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.go(this.userService.login(this.form.value));
  }

  tryDemo() {
    this.go(this.userService.tryDemo());
  }

  private go(request: Observable<unknown>) {
    this.busy = true;
    this.error = '';
    request.subscribe({
      next: () => this.router.navigate(['/newsfeed']),
      error: (e) => {
        this.error = errorText(e);
        this.busy = false;
      },
    });
  }
}
