import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardModule } from './admin-dashboard/admin-dashboard.module';
import { AdminLoginModule } from './admin-login/admin-login.module';
import { CustomerDashboardModule } from './customer-dashboard/customer-dashboard.module';
import { CustomerLoginModule } from './customer-login/customer-login.module';
import { AppComponent } from './app.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';
import { CustomerLoginComponent } from './customer-login/customer-login.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { CustomerService } from './customer.service';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';





@NgModule({
  declarations: [AppComponent,AdminDashboardComponent,AdminLoginComponent,CustomerDashboardComponent,CustomerLoginComponent],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    AdminDashboardModule,
    AdminLoginModule,
    AppRoutingModule,
    CustomerDashboardModule,
    CustomerLoginModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    BrowserAnimationsModule
  ],
  providers: [
    AuthService,  // Provide services
    AuthGuard  ,
    CustomerService,
      // Provide guards
  ],
   bootstrap:[AppComponent]
})
export class AppModule { }
