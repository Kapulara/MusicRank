import { Location } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { SecurityService } from '../../../core/security/security.service';
import { SpotifySearchPageService } from '../../../modules/spotify/spotify-search-page/spotify-search-page.service';
import { SpotifyService } from '../../../modules/spotify/spotify.service';
import { MenuService } from '../../menu/menu.service';

@Component({
  selector: 'mr-top-bar-app',
  templateUrl: './top-bar-app.component.html'
})
export class TopBarAppComponent implements OnDestroy {

  constructor(
    public securityService: SecurityService,
    public spotifySearchPageService: SpotifySearchPageService,
    public spotifyService: SpotifyService,
    public location: Location,
    public router: Router,
    public menuService: MenuService
  ) {
  }

  public ngOnDestroy() {
    this.spotifyService.stop();
  }

  public onWindowKeyPress(keyPress: KeyboardEvent) {
    if ( keyPress.keyCode === 13 ) {
      this.router.navigateByUrl('/s/' + this.spotifySearchPageService.searchString);
    }
  }

  public getPlaylist() {
    const splitted = this.spotifyService.activeSong.context.uri.split(':');
    return splitted[splitted.length - 1];
  }
}
