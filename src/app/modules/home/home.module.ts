import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '../../shared/shared.module';
import { TopBarModule } from '../../shared/top-bar/top-bar.module';
import { HomeContentComponent } from './home-content/home-content.component';
import { HomePageComponent } from './home-page/home-page.component';
import { HOME_ROUTES } from './home.routes';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,

    SharedModule,
    TopBarModule,
    HOME_ROUTES
  ],
  declarations: [ HomePageComponent, HomeContentComponent ]
})
export class HomeModule {
}
