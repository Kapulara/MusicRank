import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { ApiService } from '../../../core/security/api.service';
import { SecurityService } from '../../../core/security/security.service';
import { SideBarService } from '../../../shared/side-bar/side-bar.service';
import { TabItem } from '../../../shared/tabs/tabs.component';
import { SpotifyPlaylistPageService } from '../../spotify/spotify-playlist-page/spotify-playlist-page.service';
import moment = require('moment');

@Injectable()
export class CommunityDetailPageService {

  public community: any = null;
  public playlist: any = null;
  public proposals: any[] = [];
  public deniedProposals: any[] = [];
  public isLoading: boolean = false;
  public tabs: TabItem[] = [
    {
      key: 'playlist',
      name: 'Playlist'
    },
    {
      key: 'song-proposals',
      name: 'Song Proposals'
    },
    {
      key: 'denied-proposals',
      name: 'Denied Proposals'
    },
    {
      key: 'settings',
      name: 'Settings'
    }
    // {
    //   key: 'users',
    //   name: 'Users'
    // },
    // {
    //   key: 'settings',
    //   name: 'Settings'
    // }
  ];
  public templateContext: {
    imageSource: any;
    ownerId: any;
    title: any;
    playlistUri: any;
    underTitle: any;
    amountSongs: any;
    releaseYear: string
  } = null;
  private sideBar: ElementRef = null;

  constructor(
    private securityService: SecurityService,
    private httpClient: HttpClient,
    private spotifyPlaylistPageService: SpotifyPlaylistPageService,
    private sideBarService: SideBarService,
    private router: Router
  ) {
  }

  public async load(
    id: string,
    sideBar: ElementRef = null
  ) {
    if ( !_.isNil(sideBar) ) {
      this.sideBar = sideBar;
    }

    this.isLoading = true;
    const { data: community } = await this.httpClient.get(
      `${ApiService.host}/v1/community/${id}`,
      this.securityService.generateRequestOptions()
    ).toPromise() as any;
    this.community = community;
    if ( this.community.isAdmin ) {
      this.spotifyPlaylistPageService.communityColumns = [
        ...this.spotifyPlaylistPageService.columns,
        { key: 'remove', type: 'remove', hover: true }
      ];
    }

    await this.getProposals();
    await this.refreshPlaylist(sideBar);

    this.isLoading = false;
  }

  public async vote(proposal: any) {
    await this.httpClient.post(
      `${ApiService.host}/v1/community/${this.community.id}/songs/${proposal.songId}/vote`,
      null,
      this.securityService.generateRequestOptions()
    ).toPromise();
    await this.getProposals();
  }

  public async deleteVote(proposal: any) {
    await this.httpClient.delete(
      `${ApiService.host}/v1/community/${this.community.id}/songs/${proposal.songId}/vote`,
      this.securityService.generateRequestOptions()
    ).toPromise();
    await this.getProposals();
  }

  public async accept(songId) {
    await this.httpClient.post(
      `${ApiService.host}/v1/community/${this.community.id}/songs/${songId}/allow`,
      null,
      this.securityService.generateRequestOptions()
    ).toPromise();
    await this.getProposals();
  }

  public async decline(songId: string) {
    await this.httpClient.post(
      `${ApiService.host}/v1/community/${this.community.id}/songs/${songId}/deny`,
      null,
      this.securityService.generateRequestOptions()
    ).toPromise();
    await this.getProposals();
  }

  public async refreshPlaylist(sideBar = null) {
    if ( !this.isLoading ) {
      this.isLoading = true;
    }
    const { data: playlist } = await this.httpClient.post(
      `${ApiService.host}/v1/spotify/api/getPlaylist`,
      [ this.community.playlistId ],
      this.securityService.generateRequestOptions()
    ).toPromise() as any;
    this.playlist = playlist;

    if ( !_.isNil(sideBar) ) {
      this.setSideBar(sideBar);
    } else if ( !_.isNil(this.sideBar) ) {
      this.setSideBar(this.sideBar);
    }

    if ( this.isLoading ) {
      this.isLoading = false;
    }
  }

  public async restore(songId: any) {
    await this.httpClient.post(
      `${ApiService.host}/v1/community/${this.community.id}/songs/${songId}/restore`,
      null,
      this.securityService.generateRequestOptions()
    ).toPromise();
    await this.getProposals();
  }

  private setSideBar(sideBar) {
    const images = this.playlist.images;

    this.templateContext = {
      imageSource: !_.isNil(images[ 0 ]) ? images[ 0 ].url : 'https://images.unsplash.com/photo-1484069560501-87d72b0c3669?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&h=400&q=60',
      title: this.community.name,
      underTitle: this.community.admin.name,
      ownerId: this.community.admin.spotifyId,
      playlistUri: this.playlist.uri,
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

  private async getProposals() {
    const { data: proposals } = await this.httpClient.get(
      `${ApiService.host}/v1/community/${this.community.id}/songs`,
      this.securityService.generateRequestOptions()
    ).toPromise() as any;
    this.proposals = proposals;
    const { data: deniedProposals } = await this.httpClient.get(
      `${ApiService.host}/v1/community/${this.community.id}/songs/denied`,
      this.securityService.generateRequestOptions()
    ).toPromise() as any;
    this.deniedProposals = deniedProposals;
    const tab = _.find(this.tabs, { key: 'song-proposals' });
    const deniedTab = _.find(this.tabs, { key: 'denied-proposals' });
    tab.count = proposals.length;
    deniedTab.count = deniedProposals.length;
  }

  public async update() {
    const { data } = await this.httpClient.put(
      `${ApiService.host}/v1/community/${this.community.id}`,
      { name: this.community.name, threshold: 0 },
      this.securityService.generateRequestOptions()
    ).toPromise() as any;

    return data;
  }

  public async delete() {
    const { data } = await this.httpClient.delete(
      `${ApiService.host}/v1/community/${this.community.id}`,
      this.securityService.generateRequestOptions()
    ).toPromise() as any;
    this.router.navigateByUrl('/community');
  }
}
