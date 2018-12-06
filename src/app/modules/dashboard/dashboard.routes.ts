import { RouterModule, Routes } from '@angular/router';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { HomePageComponent } from './home-page/home-page.component';

const dashboardRoutes: Routes = [
  {
    path: 'dashboard',
    children: [
      { path: '', component: DashboardPageComponent }
    ]
  }
];

export const DASHBOARD_ROUTES = RouterModule.forChild(dashboardRoutes);
