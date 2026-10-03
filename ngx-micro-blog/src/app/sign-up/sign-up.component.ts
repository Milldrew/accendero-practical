import { CreateUserDTO } from '../types/core.types';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { errorText, UserService } from '../services/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: '',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  error = '';
  busy = false;

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.go(this.userService.createUser(this.form.value));
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
