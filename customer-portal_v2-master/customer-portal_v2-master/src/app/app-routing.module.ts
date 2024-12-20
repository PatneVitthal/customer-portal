import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AuthGuard } from './auth.guard';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';
import { CustomerLoginComponent } from './customer-login/customer-login.component';



const routes: Routes = [
  { path: '', redirectTo: 'customer/login', pathMatch: 'full' },
  { path: 'admin/login', component: AdminLoginComponent },
  { path: 'customer/login', component: CustomerLoginComponent },
  { path: 'admin/dashboard', component: AdminDashboardComponent, canActivate: [AuthGuard], data: { role: 'admin' } },
  { path: 'customer/dashboard', component: CustomerDashboardComponent, canActivate: [AuthGuard], data: { role: 'customer' } },
  { path: '**', redirectTo: 'customer/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
