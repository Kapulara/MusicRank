import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { ApiService } from '../../core/security/api.service';
import { SecurityService } from '../../core/security/security.service';

@Injectable()
export class SpotifyService {

  public activeSong;
  public timeout;

  constructor(
    private securityService: SecurityService,
    private httpClient: HttpClient
  ) {
    this.start();
  }

  public async start() {
    await this.tick();
  }

  public async tick() {
    if ( !_.isNil(this.timeout) ) {
      clearTimeout(this.timeout);
    }

    if ( this.securityService.user !== null ) {
      try {
        const { data: active } = await this.httpClient.post(
          `${ApiService.host}/v1/spotify/api/getMyCurrentPlayingTrack`,
          [],
          this.securityService.generateRequestOptions()
        ).toPromise() as any;
        this.activeSong = active;
      } catch (e) {
        console.error(e);
      }
    }

    this.timeout = setTimeout(() => this.tick(), 2000);
  }

  public async getAlbum(albumId: string) {
    return await this.httpClient.post(
      `${ApiService.host}/v1/spotify/api/getAlbum`,
      albumId,
      this.securityService.generateRequestOptions()
    ).toPromise() as any;
  }

  public async play(search: any) {
    if ( _.isString(search) ) {
      search = [ { uris: [ search ] } ];
    }

    await this.httpClient.post(
      `${ApiService.host}/v1/spotify/api/play`,
      search,
      this.securityService.generateRequestOptions()
    ).toPromise();

    await this.tick();
  }

  public async playPlaylist(
    playlistUri: string,
    position: number
  ) {
    return this.play({
      context_uri: playlistUri,
      offset: {
        position
      },
      position_ms: 0
    });
  }

  public stop() {
    if ( !_.isNil(this.timeout) ) {
      clearTimeout(this.timeout);
    }
  }
}
