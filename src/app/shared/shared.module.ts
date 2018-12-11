import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ArtistAlbumComponent } from './artist-album/artist-album.component';
import { CenterComponent } from './center/center.component';
import { ContainerComponent } from './container/container.component';
import { HeaderComponent } from './header/header.component';
import { NoContentComponent } from './no-content/no-content.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { SideBarService } from './side-bar/side-bar.service';
import { TableComponent } from './table/table.component';
import { TopBarAppComponent } from './top-bar-app/top-bar-app.component';
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
    TopBarAppComponent,
    NoContentComponent,

    CenterComponent,
    ContainerComponent,
    HeaderComponent,
    TableComponent,
    ArtistAlbumComponent
  ],
  exports: [
    SideBarComponent,
    TopBarComponent,
    TopBarAppComponent,
    NoContentComponent,

    CenterComponent,
    ContainerComponent,
    HeaderComponent,
    TableComponent,
    ArtistAlbumComponent
  ],
  providers: [
    SideBarService
  ]
})
export class SharedModule {

}
