import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '../../shared/shared.module';
import { TopBarModule } from '../../shared/top-bar/top-bar.module';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { DASHBOARD_ROUTES } from './dashboard.routes';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,

    SharedModule,
    TopBarModule,
    DASHBOARD_ROUTES
  ],
  declarations: [
    DashboardPageComponent
  ]
})
export class DashboardModule {

}
