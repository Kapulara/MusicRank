import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SecurityService } from '../../core/security/security.service';
import { SpotifySearchPageService } from '../../modules/spotify/spotify-search-page/spotify-search-page.service';

@Component({
  selector: 'mr-top-bar-app',
  templateUrl: './top-bar-app.component.html'
})
export class TopBarAppComponent {

  constructor(
    public securityService: SecurityService,
    public spotifySearchPageService: SpotifySearchPageService,
    public location: Location,
    public router: Router
  ) {
  }

  public onWindowKeyPress(keyPress: KeyboardEvent) {
    if ( keyPress.keyCode === 13 ) {
      this.router.navigateByUrl('/s/' + this.spotifySearchPageService.searchString);
    }
  }
}
