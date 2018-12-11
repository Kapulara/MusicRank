import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ApiService } from '../../../core/security/api.service';
import { SecurityService } from '../../../core/security/security.service';
import { SideBarService } from '../../../shared/side-bar/side-bar.service';
import { SpotifyArtistPageService } from '../spotify-artist-page/spotify-artist-page.service';
import moment = require('moment');

@Injectable()
export class SpotifyPlaylistPageService {

  public isLoading = false;
  public isLoading$: Subject<boolean> = new Subject();

  public playlist: any = null;
  public rows: any[] = [];
  public moreBy: any[] = [];
  public templateContext: {
    imageSource: any;
    ownerId: any;
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

    const { err, data: playlist } = await this.httpClient.post(
      `${ApiService.host}/v1/spotify/api/getPlaylist`,
      [ id, { limit: 50 } ],
      this.securityService.generateRequestOptions()
    ).toPromise() as any;
    this.playlist = playlist;

    this.setSideBar(sideBar);

    const pages = Math.ceil(this.playlist.tracks.total / 100) - 1;
    for (let i = 1; i <= pages; i++) {
      const offset = i * 100;
      const { data: playlistTrackResponse } = await this.httpClient.post(
        `${ApiService.host}/v1/spotify/api/getPlaylistTracks`,
        [ id, { offset } ],
        this.securityService.generateRequestOptions()
      ).toPromise() as any;

      this.playlist.tracks.items = [
        ...this.playlist.tracks.items,
        ...playlistTrackResponse.items
      ];
    }

    this.rows = this.playlist.tracks.items.map((
      item,
      index
    ) => ({
      index: index + 1,
      name: item.track.name,
      image: this.getSmallestImage(item.track.album.images),
      time: this.millisToMinutesAndSeconds(item.track.duration_ms),
      album: {
        id: item.track.album.id,
        name: item.track.album.name
      },
      popularity: SpotifyArtistPageService.getPopularity(item)
    }));

    // const { data: albums } = await this.httpClient.post(
    //   `${ApiService.host}/v1/spotify/api/getArtistAlbums`,
    //   [ this.playlist.artists[ 0 ].id, { limit: 50 } ],
    //   this.securityService.generateRequestOptions()
    // ).toPromise() as any;
    //
    // this.moreBy = albums.items.map(({ id: albumId, name, images, artists }) => ({
    //   id: albumId,
    //   name,
    //   image: images[ 0 ].url,
    //   artist: artists[ 0 ].name
    // }));

    this.isLoading = false;
  }

  private millisToMinutesAndSeconds(millis) {
    const minutes = Math.floor(millis / 60000);
    const seconds: number = parseInt(((millis % 60000) / 1000).toFixed(0), 10);
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  }

  private getSmallestImage(images: any[]) {
    if ( images.length > 0 ) {
      return images[ images.length - 1 ].url;
    } else {
      return '';
    }
  }

  private setSideBar(sideBar: ElementRef) {
    this.templateContext = {
      imageSource: this.playlist.images[ 0 ].url,
      title: this.playlist.name,
      underTitle: this.playlist.owner.display_name,
      ownerId: this.playlist.owner.id,
      amountSongs: this.playlist.tracks.total,
      releaseYear: moment(this.playlist.release_date).format('YYYY')
    };
    this.sideBarService.set({
      source: this.playlist.images[ 0 ].url,
      smallImage: true,
      showBackground: true,
      template: sideBar,
      templateContext: this.templateContext,
      blur: true
    });
  }
}
