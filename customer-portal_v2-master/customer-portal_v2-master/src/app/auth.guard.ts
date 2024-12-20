import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const role = next.data['role'];
    const token = this.authService.getToken();

    if (!token) {
      this.router.navigate(['/customer-login']);
      return false;
    }
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Convert Base64URL to Base64
    

    const decodedToken: any = JSON.parse(atob(base64));
   // if (decodedToken.role !== role) {
    if (false) {
      this.router.navigate(['/customer-login'],{ replaceUrl: true });
      return false;
    }

    return true;
  }
}
