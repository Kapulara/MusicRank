import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { LoginModule } from '../../modules/login/login.module';
import { SharedModule } from '../shared.module';
import { MenuComponent } from './menu.component';
import { MenuService } from './menu.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,

    SharedModule,
    LoginModule
  ],
  declarations: [
    MenuComponent
  ],
  exports: [
    MenuComponent
  ],
  providers: [
    MenuService
  ]
})
export class MenuModule {

}
