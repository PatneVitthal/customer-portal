import { Component, OnInit, ViewChild } from '@angular/core'; 
import { AuthService } from '../auth.service';
import { CustomerService } from '../customer.service';
import { HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ChartData, ChartOptions } from 'chart.js';
import { ChartType } from 'chart.js';
@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  standalone: false,
  styleUrl: './customer-dashboard.component.css'
})
export class CustomerDashboardComponent implements OnInit {
  currentView: string = 'dashboard';  // Default view is 'dashboard'
  isPopupOpen = false;
  customerName: string | null = null;
  customer: any = {};
  selectedFile: File | null = null;
  uploadStatus: string = '';
  selectedCountry: string = 'USA'; // Default country
  countries: string[] = ['USA', 'India', 'Canada', 'Germany', 'Australia']; // Add more countries as needed
  
  
  

  countryData: { [key: string]: any } = {
    USA: [100, 200, 300, 400],
    India: [150, 250, 350, 450],
    Canada: [80, 180, 280, 380],
    Germany: [200, 300, 400, 500],
    Australia: [120, 220, 320, 420],
  };
  displayedColumns: string[] = [
    'name',
    'display_name',
    'address',
    'latitude',
    'longitude',
    'email',
    'fax',
    'delete',
    'active'
  ];
  selectedRow: any = null;
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
    this.customerName = localStorage.getItem('customerName');
    this.updateChartData(this.selectedCountry);
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
            this.loadRecentStores();
          },
          (error) => {
            console.error('Error Response:', error);
            this.uploadStatus = error?.error?.message || 'File upload failed. Please try again.';
          }
          
        );
    }
  }
  onCountryChange(event: any) {
    const country = event.target.value;
    this.updateChartData(country);
  }

  updateChartData(country: string) {
    this.chartData = {
      labels: ['JAN', 'FEB', 'MAR', 'APR'], // Example labels
      datasets: [
        {
          label: `${country} Performance`,
          data: this.countryData[country],
          borderColor: '#007bff',
          fill: false,
        },
      ],
    };

    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
        },
      },
    };
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

  public chartOptions: ChartOptions = {
    responsive: true,
  };
    // chart-2
  public chartData: ChartData<'line'> = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        data: [65, 59, 80, 81, 56],
        label: 'My First Dataset',
        borderColor: 'blue',
        fill: false,
      },
    ],
  }; 
  public chartType: ChartType = 'line';

  public performanceLineChartData: ChartData<'line'> = {
    labels: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
    datasets: [
      {
        label: 'This Week',
        data: [50, 110, 60, 290, 200, 115, 130],
        backgroundColor: 'rgba(26, 115, 232, 0.18)',
        borderColor: '#1F3BB3',
        borderWidth: 1.5,
        fill: true,
        pointRadius: 4,
        pointBackgroundColor: '#1F3BB3',
        pointBorderColor: '#fff',
      },
      {
        label: 'Last Week',
        data: [30, 150, 190, 250, 120, 150, 130],
        backgroundColor: 'rgba(0, 208, 255, 0.19)',
        borderColor: '#52CDFF',
        borderWidth: 1.5,
        fill: true,
        pointRadius: 4,
        pointBackgroundColor: '#52CDFF',
        pointBorderColor: '#fff',
      }
    ]
  };

  public performanceLineChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: false,
        grid: { color: '#F0F0F0' },
        ticks: { color: '#6B778C', font: { size: 10 } }
      },
      x: {
        grid: { display: false },
        ticks: { color: '#6B778C', font: { size: 10 } }
      }
    },
    plugins: {
      legend: { display: true,
        align: 'end', // Aligns the legend to the left
      position: 'top', // You can also use 'bottom', 'left', or 'right'
       }
      
    }
    
  };
  
  public performanceLineChartType: ChartType = 'line';

  public statusSummaryChartData: ChartData<'line'> = {
    labels: ["SUN", "MON", "TUE", "WED", "THU", "FRI"],
    datasets: [{
      label: '# of Votes',
      data: [50, 68, 70, 10, 12, 80],
      backgroundColor: "#ffcc00",
      borderColor: '#01B6A0',
      borderWidth: 2,
      fill: false,
      pointBorderWidth: 0,
      pointRadius: [0, 0, 0, 0, 0, 0],
      pointHoverRadius: [0, 0, 0, 0, 0, 0]
    }]
  };

  
  public statusSummaryChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      line: {
        tension: 0.4, 
      }
    },
    scales: {
      y: {
        display: false, 
        grid: {
          display: false,
          borderColor: 'transparent'
        },
        ticks: { display: false } 
      },
      x: {
        display: false,
        grid: {
          display: false,
          borderColor: 'transparent'
        },
        ticks: { display: false }
      }
    },
    plugins: {
      legend: {
        display: false
      }
    }
  };
  public statusSummaryChartType: ChartType = 'line';

  onRowClick(row: any): void {
    this.selectedRow = row; 
  }
}

