import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginInputComponent } from '../../../../core/components/login-input/login-input.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, LoginInputComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  errorMessage: string | null = null;

  constructor(private router: Router) {}

  handleLoginSuccess(): void {
    this.router.navigate(['/registered-list']);
  }

  handleLoginError(message: string): void {
    this.errorMessage = message;
  }
}
