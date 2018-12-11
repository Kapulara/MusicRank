import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '../../shared/shared.module';
import { SpotifyArtistPageComponent } from './spotify-artist-page/spotify-artist-page.component';
import { SpotifyAlbumPageComponent } from './spotify-album-page/spotify-album-page.component';
import { SpotifyAlbumPageService } from './spotify-album-page/spotify-album-page.service';
import { SpotifyArtistPageService } from './spotify-artist-page/spotify-artist-page.service';
import { SpotifyPlaylistPageComponent } from './spotify-playlist-page/spotify-playlist-page.component';
import { SpotifyPlaylistPageService } from './spotify-playlist-page/spotify-playlist-page.service';
import { SpotifySearchPageComponent } from './spotify-search-page/spotify-search-page.component';
import { SpotifySearchPageService } from './spotify-search-page/spotify-search-page.service';
import { SpotifyUserPageComponent } from './spotify-user-page/spotify-user-page.component';
import { SpotifyUserPageService } from './spotify-user-page/spotify-user-page.service';
import { SPOTIFY_ROUTES } from './spotify.routes';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,

    SharedModule,
    SPOTIFY_ROUTES
  ],
  declarations: [
    SpotifyArtistPageComponent,
    SpotifyAlbumPageComponent,
    SpotifyUserPageComponent,
    SpotifySearchPageComponent,
    SpotifyPlaylistPageComponent
  ],
  providers: [
    SpotifyAlbumPageService,
    SpotifyArtistPageService,
    SpotifySearchPageService,
    SpotifyUserPageService,
    SpotifyPlaylistPageService,
  ]
})
export class SpotifyModule {
}
