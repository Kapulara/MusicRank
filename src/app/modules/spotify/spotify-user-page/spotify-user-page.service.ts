import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { Subject } from 'rxjs';
import { ApiService } from '../../../core/security/api.service';
import { SecurityService } from '../../../core/security/security.service';
import { SideBarService } from '../../../shared/side-bar/side-bar.service';
import { SpotifyArtistPageService } from '../spotify-artist-page/spotify-artist-page.service';
import moment = require('moment');

@Injectable()
export class SpotifyUserPageService {

  public isLoading = false;
  public isLoading$: Subject<boolean> = new Subject();

  public user: any = null;
  public templateContext: {
    imageSource: any;
    artistId: any;
    title: any;
    amountSongs: any;
  } = null;
  public rows: any[] = [];
  public playlists: any[] = [];
  public artists: any[] = [];
  public albums: any[] = [];
  public id: string = '';

  constructor(
    private securityService: SecurityService,
    private httpClient: HttpClient,
    private sideBarService: SideBarService,
    private router: Router
  ) {
  }

  public async load(
    id: any,
    sideBar: ElementRef
  ) {
    if ( this.id === id ) {
      this.setSideBar(sideBar);
      return;
    }
    this.id = id;

    this.isLoading = true;
    this.isLoading$.next(this.isLoading);

    const { err, data: user } = await this.httpClient.post(
      `${ApiService.host}/v1/spotify/api/getUser`,
      [ id ],
      this.securityService.generateRequestOptions()
    ).toPromise() as any;
    this.user = user;
    this.setSideBar(sideBar);

    const { data: userPlaylists } = await this.httpClient.post(
      `${ApiService.host}/v1/spotify/api/getUserPlaylists`,
      [ id, { limit: 50 } ],
      this.securityService.generateRequestOptions()
    ).toPromise() as any;

    const pages = Math.ceil(userPlaylists.total / 50) - 1;
    for (let i = 1; i <= pages; i++) {
      const offset = i * 50;
      const { data: playlistTrackResponse } = await this.httpClient.post(
        `${ApiService.host}/v1/spotify/api/getUserPlaylists`,
        [ id, { offset, limit: 50 } ],
        this.securityService.generateRequestOptions()
      ).toPromise() as any;

      userPlaylists.items = [
        ...userPlaylists.items,
        ...playlistTrackResponse.items
      ];
    }

    this.playlists = userPlaylists.items.map(({ id: playlistId, name, images }) => ({
      id: playlistId,
      name,
      image: !_.isNil(images[ 0 ]) ? images[ 0 ].url : ''
    }));

    // this.albums = this.user.albums.items.map(({ id: albumId, name, images, artists }) => ({
    //   id: albumId,
    //   name,
    //   image: !_.isNil(images[ 0 ]) ? images[ 0 ].url : '',
    //   artist: artists[ 0 ].name
    // }));
    // this.artists = this.user.artists.items.map(({ id: artistId, name, images }) => ({
    //   id: artistId,
    //   name,
    //   image: !_.isNil(images[ 0 ]) ? images[ 0 ].url : ''
    // }));
    //
    this.isLoading = false;
  }

  private millisToMinutesAndSeconds(millis) {
    const minutes = Math.floor(millis / 60000);
    const seconds: number = parseInt(((millis % 60000) / 1000).toFixed(0), 10);
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  }

  private setSideBar(sideBar) {
    this.templateContext = {
      imageSource: this.user.images[ 0 ].url,
      title: this.user.display_name,
      artistId: this.user.id,
      amountSongs: this.user.followers
    };
    this.sideBarService.set({
      source: this.user.images[ 0 ].url,
      smallImage: true,
      showBackground: true,
      template: sideBar,
      templateContext: this.templateContext,
      blur: true
    });
  }
}
