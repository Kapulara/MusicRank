import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { LoginModule } from '../../modules/login/login.module';
import { TopBarAppComponent } from './top-bar-app/top-bar-app.component';
import { TopBarComponent } from './top-bar.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule
  ],
  declarations: [
    TopBarComponent,
    TopBarAppComponent
  ],
  exports: [
    TopBarComponent,
    TopBarAppComponent
  ]
})
export class TopBarModule {

}
