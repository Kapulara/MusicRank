import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '../shared/shared.module';
import { ApiService } from './security/api.service';
import { AuthAppGuard } from './security/auth-app.guard';
import { AuthRedirectGuard } from './security/auth-redirect.guard';
import { SecurityService } from './security/security.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,

    SharedModule,
  ],
  providers: [
    ApiService,
    SecurityService,
    AuthRedirectGuard,
    AuthAppGuard
  ]
})
export class CoreModule {

}
