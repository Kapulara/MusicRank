import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { SpotifyModule } from '../modules/spotify/spotify.module';
import { ArtistAlbumComponent } from './artist-album/artist-album.component';
import { CenterComponent } from './center/center.component';
import { ContainerComponent } from './container/container.component';
import { HeaderComponent } from './header/header.component';
import { NoContentComponent } from './no-content/no-content.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { SideBarService } from './side-bar/side-bar.service';
import { TableComponent } from './table/table.component';
import { TabsComponent } from './tabs/tabs.component';
import { TopBarModule } from './top-bar/top-bar.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,

    TopBarModule
  ],
  declarations: [
    SideBarComponent,
    NoContentComponent,

    CenterComponent,
    ContainerComponent,
    HeaderComponent,
    TableComponent,
    ArtistAlbumComponent,
    TabsComponent
  ],
  exports: [
    SideBarComponent,
    NoContentComponent,

    CenterComponent,
    ContainerComponent,
    HeaderComponent,
    TableComponent,
    ArtistAlbumComponent,
    TabsComponent
  ],
  providers: [
    SideBarService
  ]
})
export class SharedModule {

}
