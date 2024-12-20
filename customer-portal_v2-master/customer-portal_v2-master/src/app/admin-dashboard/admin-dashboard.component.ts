import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  standalone: false,
  styleUrl: './admin-dashboard.component.css'
})

export class AdminDashboardComponent implements OnInit {
  customers: any[] = [];

  constructor(private customerService: CustomerService,private authService: AuthService) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.customerService.getCustomers().subscribe({
      next: (data) => {
        this.customers = data;
      },
      error: (err) => {
        console.error('Error fetching customers:', err);
      }
    });
  }

  openCreateCustomerModal(): void {
    // Open modal logic here
    console.log('Opening create customer modal');
  }

  editCustomer(customer: any): void {
    // Edit customer logic here
    console.log('Editing customer:', customer);
  }

  deleteCustomer(id: string): void {
    this.customerService.deleteCustomer(id).subscribe({
      next: () => {
        console.log('Customer deleted successfully');
        this.loadCustomers();
      },
      error: (err) => {
        console.error('Error deleting customer:', err);
      }
    });
  }

  logout(): void {
    this.authService.logout();
  }
}

