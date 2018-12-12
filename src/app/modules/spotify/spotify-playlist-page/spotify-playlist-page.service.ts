import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Injectable } from '@angular/core';
import { P } from '@angular/core/src/render3';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { Subject } from 'rxjs';
import { ApiService } from '../../../core/security/api.service';
import { SecurityService } from '../../../core/security/security.service';
import { SideBarService } from '../../../shared/side-bar/side-bar.service';
import { TableColumn } from '../../../shared/table/table.component';
import { SpotifyArtistPageService } from '../spotify-artist-page/spotify-artist-page.service';
import { SpotifyService } from '../spotify.service';
import moment = require('moment');

@Injectable()
export class SpotifyPlaylistPageService {

  public isLoading = false;
  public isLoading$: Subject<boolean> = new Subject();

  public playlist: any = null;
  public rows: any[] = [];
  public columns: TableColumn[] = [
    {
      key: 'index',
      name: '#',
      hover: true
    },
    {
      type: 'image',
      key: 'image',
      hover: true
    },
    {
      key: 'name',
      name: 'Name',
      fill: true,
      hover: true
    },
    {
      key: 'album',
      type: 'album',
      hover: true,
      name: 'Album'
    },
    {
      key: 'time',
      icon: 'mr-time-countdown-2',
      hover: true
    },
    {
      key: 'popularity',
      type: 'popularity',
      hover: true
    }
  ];
  public communityColumns: TableColumn[] = [
    ...this.columns
  ];

  public moreBy: any[] = [];
  public templateContext: {
    imageSource: any;
    ownerId: any;
    title: any;
    underTitle: any;
    amountSongs: any;
    releaseYear: string
  } = null;
  private community: any = null;
  private id: string = null;

  constructor(
    private securityService: SecurityService,
    private httpClient: HttpClient,
    private router: Router,
    private sideBarService: SideBarService
  ) {
  }

  public async load(
    id: any,
    sideBar: ElementRef = null
  ) {
    this.id = id;
    this.isLoading = true;
    this.isLoading$.next(this.isLoading);

    if ( !_.isNil(sideBar) ) {
      try {
        const { data: community } = await this.httpClient.get(
          `${ApiService.host}/v1/community/${id}`,
          this.securityService.generateRequestOptions()
        ).toPromise() as any;
        this.router.navigateByUrl(`/community/${id}`, { replaceUrl: true });
        this.community = community;
      } catch (e) {
        this.community = null;
      }
    }

    await this.refreshPlaylist(sideBar);

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

  public async refreshPlaylist(sideBar: ElementRef = null) {
    if ( !this.isLoading ) {
      this.isLoading = true;
    }
    const { err, data: playlist } = await this.httpClient.post(
      `${ApiService.host}/v1/spotify/api/getPlaylist`,
      [ this.id, { limit: 50 } ],
      this.securityService.generateRequestOptions()
    ).toPromise() as any;
    this.playlist = playlist;

    if ( !_.isNil(sideBar) ) {
      this.setSideBar(sideBar);
    }

    const pages = Math.ceil(this.playlist.tracks.total / 100) - 1;
    for (let i = 1; i <= pages; i++) {
      const offset = i * 100;
      const { data: playlistTrackResponse } = await this.httpClient.post(
        `${ApiService.host}/v1/spotify/api/getPlaylistTracks`,
        [ this.id, { offset } ],
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
      trackId: item.track.id,
      uri: item.track.uri,
      playlistUri: this.playlist.uri,
      name: item.track.name,
      image: this.getSmallestImage(item.track.album.images),
      time: this.millisToMinutesAndSeconds(item.track.duration_ms),
      album: {
        id: item.track.album.id,
        name: item.track.album.name
      },
      popularity: SpotifyArtistPageService.getPopularity(item.track)
    }));
    if ( this.isLoading ) {
      this.isLoading = false;
    }
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
    const images = this.playlist.images;

    this.templateContext = {
      imageSource: !_.isNil(images[ 0 ]) ? images[ 0 ].url : 'https://images.unsplash.com/photo-1484069560501-87d72b0c3669?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&h=400&q=60',
      title: this.playlist.name,
      underTitle: this.playlist.owner.display_name,
      ownerId: this.playlist.owner.id,
      amountSongs: this.playlist.tracks.total,
      releaseYear: moment(this.playlist.release_date).format('YYYY')
    };
    this.sideBarService.set({
      source: !_.isNil(images[ 0 ]) ? images[ 0 ].url : 'https://images.unsplash.com/photo-1484069560501-87d72b0c3669?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&h=400&q=60',
      smallImage: true,
      showBackground: true,
      template: sideBar,
      templateContext: this.templateContext,
      blur: true
    });
  }
}
