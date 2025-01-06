import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  standalone: false,
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.authService.login(this.username, this.password, 'admin').subscribe(
      (response) => {
        this.authService.setToken(response.token, 'admin',response.customer[0].name);
        this.router.navigate(['/admin/dashboard']);
      },
      (error) => {
        this.errorMessage = 'Invalid credentials';
      }
    );
  }
}

