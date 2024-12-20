import { Component, OnInit, ViewChild } from '@angular/core'; 
import { AuthService } from '../auth.service';
import { CustomerService } from '../customer.service';
import { HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  standalone: false,
  styleUrl: './customer-dashboard.component.css'
})
export class CustomerDashboardComponent implements OnInit {
  currentView: string = 'dashboard';  // Default view is 'dashboard'
  isPopupOpen = false;
  customer: any = {};
  selectedFile: File | null = null;
  uploadStatus: string = '';
  displayedColumns: string[] = [
    'name',
    'display_name',
    'address',
    'latitude',
    'longitude',
    'email',
    'fax',
  ];
  dataSource = new MatTableDataSource<any>();
  showView(view: string) {
    this.currentView = view;
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  recentStores: any[] = [];
  
  constructor(
    private customerService: CustomerService,
    private authService: AuthService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.loadCustomerDetails();
    this.loadRecentStores();
  }

  loadCustomerDetails(): void {
    this.customerService.getAllStoreDetails().subscribe({
      next: (data) => {
        this.customer = data;
      },
      error: (err) => {
        console.error('Error fetching customer details:', err);
      }
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      this.selectedFile = input.files[0];
    }
  }

  uploadFile(): void {
    if (this.selectedFile) {
      const allowedTypes = ['text/csv'];
      if (!allowedTypes.includes(this.selectedFile.type)) {
        this.uploadStatus = 'Invalid file type. Please select a valid file.';
        return;
      }

      const formData = new FormData();
      formData.append('file', this.selectedFile, this.selectedFile.name);

      this.uploadStatus = 'Uploading...';
      this.http.post<{ message: string }>('http://localhost:3000/v1/upload', formData)
        .subscribe(
          (response) => {
            this.uploadStatus = response?.message || 'File uploaded successfully!';
            this.selectedFile = null; 
            this.loadRecentStores();// Clear file selection
          },
          (error) => {
            console.error('Error Response:', error);
            this.uploadStatus = error?.error?.message || 'File upload failed. Please try again.';
          }
          
        );
    }
  }
  downloadSampleCsv() {
    const sampleData = [
      ['name', 'display_name', 'Address', 'latitude', 'longitude', 'fax', 'email', 'sun_facing_amt', 'optical_facing_amt', 'phone_number', 'monday_time', 'tuesday_time', 'wednesday_time', 'thursday_time', 'friday_time', 'saturday_time', 'sunday_time'],
      ['1000000', 'Store One', '123 Street Name', '12.34', '56.78', '123456789', 'store1@example.com', '100', '200', '1234567890', '9:00-18:00', '9:00-18:00', '9:00-18:00', '9:00-18:00', '9:00-18:00', '9:00-18:00', '9:00-18:00']
    ];
  
    let csvContent = "data:text/csv;charset=utf-8,";
    sampleData.forEach(rowArray => {
      const row = rowArray.join(',');
      csvContent += row + "\r\n";
    });
  
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'sample.csv');
    document.body.appendChild(link);
  
    link.click();
    document.body.removeChild(link);
  }
  
  loadRecentStores(): void {
    this.customerService.getRecentStores().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.error('Error fetching recent stores:', err);
      },
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  togglePopup() {
    this.isPopupOpen = !this.isPopupOpen;
  }

  logout(): void {
    this.authService.logout();
  }
}
