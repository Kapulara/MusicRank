import { RouterModule, Routes } from '@angular/router';
import { AuthAppGuard } from '../../core/security/auth-app.guard';
import { SpotifyArtistPageComponent } from './spotify-artist-page/spotify-artist-page.component';
import { SpotifyAlbumPageComponent } from './spotify-album-page/spotify-album-page.component';
import { SpotifyPlaylistPageComponent } from './spotify-playlist-page/spotify-playlist-page.component';
import { SpotifySearchPageComponent } from './spotify-search-page/spotify-search-page.component';
import { SpotifyUserPageComponent } from './spotify-user-page/spotify-user-page.component';

const spotifyRoutes: Routes = [
  {
    path: 's',
    canActivate: [ AuthAppGuard ],
    children: [
      {
        path: ':query',
        component: SpotifySearchPageComponent
      },
      {
        path: 'album/:id',
        component: SpotifyAlbumPageComponent
      },
      {
        path: 'playlist/:id',
        component: SpotifyPlaylistPageComponent
      },
      {
        path: 'user/:id',
        component: SpotifyUserPageComponent
      },
      {
        path: 'artist/:id',
        component: SpotifyArtistPageComponent
      }
    ]
  }
];

export const SPOTIFY_ROUTES = RouterModule.forChild(spotifyRoutes);
