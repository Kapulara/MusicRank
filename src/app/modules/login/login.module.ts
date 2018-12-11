import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { LoginAccountPageComponent } from './login-account-page/login-account-page.component';
import { LoginFailurePageComponent } from './login-failure-page/login-failure-page.component';
import { LoginLoadingPageComponent } from './login-loading-page/login-loading-page.component';
import { LoginRedirectPageComponent } from './login-redirect-page/login-redirect-page.component';
import { LoginTokenPageComponent } from './login-token-page/login-token-page.component';
import { LoginUserComponent } from './login-user/login-user.component';
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
    LoginAccountPageComponent,
    LoginRedirectPageComponent,
    LoginLoadingPageComponent,
    LoginTokenPageComponent,
    LoginUserComponent
  ],
  exports: [
    LoginUserComponent
  ]
})
export class LoginModule {

}
