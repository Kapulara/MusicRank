import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { LoginFailurePageComponent } from './login-failure-page/login-failure-page.component';
import { LoginRedirectComponent } from './login-redirect/login-redirect.component';
import { LoginTokenComponent } from './login-token/login-token.component';
import { LOGIN_ROUTES } from './login.routes';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,

    SharedModule,

    LOGIN_ROUTES
  ],
  declarations: [
    LoginFailurePageComponent,
    LoginRedirectComponent,
    LoginTokenComponent
  ]
})
export class LoginModule {

}
