import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-portal',
  templateUrl: './select-portal.component.html',
  styleUrls: ['./select-portal.component.css']
})
export class SelectPortalComponent {
  constructor(private router: Router) {}

  navigateTo(portal: string) {
    if (portal === 'loyalty') {
      this.router.navigate(['/loyalty-portal']); // Adjust as needed
    } else if (portal === 'storeFinder') {
      this.router.navigate(['/customer/dashboard'],{ replaceUrl: true });
    }
  }
}
