import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ApiService } from '../../../core/security/api.service';
import { SecurityService } from '../../../core/security/security.service';
import { SideBarService } from '../../../shared/side-bar/side-bar.service';
import moment = require('moment');

@Injectable()
export class SpotifyAlbumPageService {

  public isLoading = false;
  public isLoading$: Subject<boolean> = new Subject();

  public album: any = null;
  public rows: any[] = [];
  public moreBy: any[] = [];
  public templateContext: {
    imageSource: any;
    artistId: any;
    title: any;
    underTitle: any;
    amountSongs: any;
    releaseYear: string
  } = null;
  private id = '';

  constructor(
    private securityService: SecurityService,
    private httpClient: HttpClient,
    private sideBarService: SideBarService
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

    const { err, data: album } = await this.httpClient.post(
      `${ApiService.host}/v1/spotify/api/getAlbum`,
      [ id ],
      this.securityService.generateRequestOptions()
    ).toPromise() as any;
    this.album = album;
    this.setSideBar(sideBar);

    this.rows = this.album.tracks.items.map((
      item,
      index
    ) => ({
      index: index + 1,
      name: item.name,
      image: this.album.images[ 0 ].url,
      time: this.millisToMinutesAndSeconds(item.duration_ms)
    }));

    const { data: albums } = await this.httpClient.post(
      `${ApiService.host}/v1/spotify/api/getArtistAlbums`,
      [ this.album.artists[ 0 ].id, { limit: 50 } ],
      this.securityService.generateRequestOptions()
    ).toPromise() as any;

    this.moreBy = albums.items.map(({ id: albumId, name, images, artists }) => ({
      id: albumId,
      name,
      image: images[ 0 ].url,
      artist: artists[ 0 ].name
    }));

    this.isLoading = false;
  }

  private millisToMinutesAndSeconds(millis) {
    const minutes = Math.floor(millis / 60000);
    const seconds: number = parseInt(((millis % 60000) / 1000).toFixed(0), 10);
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  }

  private setSideBar(sideBar) {
    this.templateContext = {
      imageSource: this.album.images[ 0 ].url,
      title: this.album.name,
      underTitle: this.album.artists[ 0 ].name,
      artistId: this.album.artists[ 0 ].id,
      amountSongs: this.album.tracks.total,
      releaseYear: moment(this.album.release_date).format('YYYY')
    };
    this.sideBarService.set({
      source: this.album.images[ 0 ].url,
      smallImage: true,
      showBackground: true,
      template: sideBar,
      templateContext: this.templateContext,
      blur: true
    });
  }
}
