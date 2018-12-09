import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Injectable } from '@angular/core';
import * as _ from 'lodash';
import { ApiService } from '../../../core/security/api.service';
import { SecurityService } from '../../../core/security/security.service';
import { SideBarService } from '../../../shared/side-bar/side-bar.service';
import moment = require('moment');

@Injectable()
export class SpotifyArtistPageService {

  public isLoading = false;
  public artist: any = null;
  public popularSongs: any[] = [];
  public moreBy: any[] = [];
  public relatedArtists: any[] = [];
  public templateContext: {
    imageSource: any;
    title: any;
    underTitle: any;
    followers: any;
  } = null;
  private id = '';

  constructor(
    private securityService: SecurityService,
    private httpClient: HttpClient,
    private sideBarService: SideBarService
  ) {
  }

  public static getPopularity(item) {
    const popularityItems = [];
    for (let i = 1; i <= 10; i++) {
      let maxCurrent = i * 10 - 1;
      if ( i === 10 ) {
        maxCurrent = i * 10;
      }

      popularityItems.push({
        active: item.popularity >= maxCurrent
      });
    }

    return popularityItems;
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
    const { err, data: artist } = await this.httpClient.post(
      `${ApiService.host}/v1/spotify/api/getArtist`,
      [ id ],
      this.securityService.generateRequestOptions()
    ).toPromise() as any;
    this.artist = artist;
    this.setSideBar(sideBar);


    const { data: response } = await this.httpClient.post(
      `${ApiService.host}/v1/spotify/api/getArtistTopTracks`,
      [ id, 'NL' ],
      this.securityService.generateRequestOptions()
    ).toPromise() as any;
    const { tracks } = response;

    this.popularSongs = tracks.map((
      item,
      index
    ) => ({
      index: index + 1,
      name: item.name,
      image: item.album.images[ 0 ].url,
      album: {
        id: item.album.id,
        name: item.album.name
      },
      popularity: SpotifyArtistPageService.getPopularity(item),
      time: this.millisToMinutesAndSeconds(item.duration_ms)
    }));

    const { data: albums } = await this.httpClient.post(
      `${ApiService.host}/v1/spotify/api/getArtistAlbums`,
      [ id, { limit: 50 } ],
      this.securityService.generateRequestOptions()
    ).toPromise() as any;

    this.moreBy = albums.items.map(({ id: albumId, name, images, artists }) => ({
      id: albumId,
      name,
      image: !_.isNil(images[ 0 ]) ? images[ 0 ].url : '',
      artist: artists[ 0 ].name
    }));

    const { data: relatedArtistsResponse } = await this.httpClient.post(
      `${ApiService.host}/v1/spotify/api/getArtistRelatedArtists`,
      [ id ],
      this.securityService.generateRequestOptions()
    ).toPromise() as any;

    this.relatedArtists = relatedArtistsResponse.artists.map(({ id: artistId, name, images }) => ({
      id: artistId,
      name,
      image: !_.isNil(images[ 0 ]) ? images[ 0 ].url : ''
    }));

    this.isLoading = false;
  }

  private formatGenres() {
    const genres = this.artist.genres.map((genre) => genre.split(' ')
      .map((part) => {
        const letters = part.split('');
        letters[ 0 ] = part.charAt(0).toUpperCase();
        return letters.join('');
      }).join(' '));

    let genreStr = '';

    if ( genres.length === 1 ) {
      return genres[ 0 ];
    }
    if ( genres.length === 2 ) {
      return genres[ 0 ] + ' and ' + genres[ 1 ];
    }

    for (let i = 0; i < genres.length; i++) {
      const genre = genres[ i ];

      if ( i === genres.length - 1 ) {
        genreStr += ' and ' + genre;
      } else if ( i === genres.length - 2 ) {
        genreStr += genre;
      } else {
        genreStr += genre + ', ';
      }
    }

    return genreStr;
  }

  private millisToMinutesAndSeconds(millis) {
    const minutes = Math.floor(millis / 60000);
    const seconds: number = parseInt(((millis % 60000) / 1000).toFixed(0), 10);
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  }

  private formatFollowers() {
    const followers = this.artist.followers.total;
    // hundreds
    if ( followers <= 999 ) {
      return followers;
    } else if ( followers >= 1e3 && followers <= 999999 ) {
      return (followers / 1e3).toFixed(3);
    } else if ( followers >= 1e6 && followers <= 999999999 ) {
      return (followers / 1e6).toFixed(1) + ' million';
    } else if ( followers >= 1e9 && followers <= 999999999999 ) {
      return (followers / 1e9).toFixed(1) + ' billion';
    } else {
      return followers;
    }
  }

  private setSideBar(sideBar: ElementRef) {
    this.templateContext = {
      imageSource: !_.isNil(this.artist.images[ 0 ]) ? this.artist.images[ 0 ].url : '',
      title: this.artist.name,
      underTitle: this.formatGenres(),
      followers: this.formatFollowers()
    };
    this.sideBarService.set({
      source: !_.isNil(this.artist.images[ 0 ]) ? this.artist.images[ 0 ].url : '',
      smallImage: true,
      showBackground: true,
      template: sideBar,
      templateContext: this.templateContext,
      blur: true
    });
  }
}
