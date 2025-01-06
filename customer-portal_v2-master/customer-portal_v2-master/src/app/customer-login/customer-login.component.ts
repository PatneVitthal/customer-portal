import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-customer-login',
  templateUrl: './customer-login.component.html',
  standalone: false,
  styleUrl: './customer-login.component.css'
})
export class CustomerLoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.authService.login(this.username, this.password, 'customer').subscribe(
      (response) => {
        
        this.authService.setToken(response.token, 'customer', response.customer[0].name);
        this.router.navigate(['/customer/dashboard']);
      },
      (error) => {
        this.errorMessage = 'Invalid credentials';
      }
    );
  }
}

