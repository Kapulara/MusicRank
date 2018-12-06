import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { MenuService } from './menu/menu.service';
import { SideBarComponent } from './side-bar/side-bar.component';
import { SideBarService } from './side-bar/side-bar.service';
import { TopBarComponent } from './top-bar/top-bar.component';

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
    SideBarComponent,
    TopBarComponent,
    MenuComponent
  ],
  exports: [
    SideBarComponent,
    TopBarComponent,
    MenuComponent
  ],
  providers: [
    SideBarService,
    MenuService
  ]
})
export class SharedModule {

}
