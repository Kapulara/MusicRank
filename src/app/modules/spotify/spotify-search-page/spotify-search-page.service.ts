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
export class SpotifySearchPageService {

  public isLoading = false;
  public isLoading$: Subject<boolean> = new Subject();

  public search: any = null;
  public rows: any[] = [];
  public artists: any[] = [];
  public albums: any[] = [];
  public playlists: any[] = [];
  public searchString: string = '';

  constructor(
    private securityService: SecurityService,
    private httpClient: HttpClient,
    private sideBarService: SideBarService,
    private router: Router
  ) {
  }

  public async load(
    query: any
  ) {
    this.searchString = query;

    this.isLoading = true;
    this.isLoading$.next(this.isLoading);

    const { err, data: searchResults } = await this.httpClient.post(
      `${ApiService.host}/v1/spotify/api/search`,
      [ query, [ 'album', 'artist', 'track', 'playlist' ], { limit: 18 } ],
      this.securityService.generateRequestOptions()
    ).toPromise() as any;
    this.search = searchResults;
    this.setSideBar();

    this.rows = this.search.tracks.items.map((
      item,
      index
    ) => ({
      index: index + 1,
      name: item.name,
      trackId: item.id,
      uri: item.uri,
      album: {
        id: item.album.id,
        name: item.album.name
      },
      popularity: SpotifyArtistPageService.getPopularity(item),
      image: item.album.images[ 0 ].url,
      time: this.millisToMinutesAndSeconds(item.duration_ms)
    }));
    this.albums = this.search.albums.items.map(({ id: albumId, name, images, artists }) => ({
      id: albumId,
      name,
      image: !_.isNil(images[ 0 ]) ? images[ 0 ].url : 'https://images.unsplash.com/photo-1484069560501-87d72b0c3669?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&h=400&q=60',
      artist: artists[ 0 ].name
    }));
    this.artists = this.search.artists.items.map(({ id: artistId, name, images }) => ({
      id: artistId,
      name,
      image: !_.isNil(images[ 0 ]) ? images[ 0 ].url : 'https://images.unsplash.com/photo-1484069560501-87d72b0c3669?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&h=400&q=60'
    }));
    this.playlists = this.search.playlists.items.map(({ id: id, name, images }) => ({
      id,
      name,
      image: !_.isNil(images[ 0 ]) ? images[ 0 ].url : 'https://images.unsplash.com/photo-1484069560501-87d72b0c3669?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&h=400&q=60'
    }));
    //
    this.isLoading = false;
  }

  public searchValue(searchValue: string) {
    this.router;
  }

  private millisToMinutesAndSeconds(millis) {
    const minutes = Math.floor(millis / 60000);
    const seconds: number = parseInt(((millis % 60000) / 1000).toFixed(0), 10);
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  }

  private setSideBar() {
    this.sideBarService.set({
      source: '/assets/img/background/junior-pereira-73904-unsplash.jpg',
      blur: true,
      small: true
    });
  }
}
