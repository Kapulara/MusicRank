import { Location } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import { SecurityService } from '../../../core/security/security.service';
import { SideBarService } from '../../../shared/side-bar/side-bar.service';
import { TableColumn } from '../../../shared/table/table.component';
import { TabItem } from '../../../shared/tabs/tabs.component';
import { SpotifyPlaylistPageService } from '../../spotify/spotify-playlist-page/spotify-playlist-page.service';
import { SpotifyService } from '../../spotify/spotify.service';
import { CommunityDetailPageService } from './community-detail-page.service';

@Component({
  selector: 'mr-community-detail-page',
  templateUrl: './community-detail-page.component.html'
})
export class CommunityDetailPageComponent implements AfterViewInit {

  @ViewChild('communitySideBar')
  public communitySideBar: ElementRef;

  public id = null;
  public activeTab = null;
  public updateModalVisible: boolean = false;
  public updateName: string;

  constructor(
    public communityDetailPageService: CommunityDetailPageService,
    public spotifyPlaylistPageService: SpotifyPlaylistPageService,
    private sideBarService: SideBarService,
    private spotifyService: SpotifyService,
    private route: ActivatedRoute,
    private router: Router,
    private securityService: SecurityService,
    private location: Location
  ) {
    this.sideBarService.set({
      source: '/assets/img/background/junior-pereira-73904-unsplash.jpg',
      blur: true,
      small: true
    });
  }

  public ngAfterViewInit() {
    this.route.params.subscribe(async ({ id, tab }) => {
      this.id = id;
      await this.communityDetailPageService.load(id, this.communitySideBar);
      console.log(this.communityDetailPageService.playlist.id);
      await this.spotifyPlaylistPageService.load(this.communityDetailPageService.playlist.id);

      if ( !_.isNil(tab) ) {
        const foundTab = _.find(this.communityDetailPageService.tabs, { key: tab });

        if ( !_.isNil(foundTab) ) {
          this.activeTab = foundTab;
        }
      }
    });
  }

  public async onRowClick({ row, column }) {
    const columnWithType: TableColumn = column;
    console.log(columnWithType);
    if ( columnWithType.type === 'album' ) {
      this.router.navigate([ '/s/album/' + row[ columnWithType.key ].id ]);
    } else if ( columnWithType.type === 'remove' ) {
      await this.communityDetailPageService.decline(row.trackId);
      await this.communityDetailPageService.refreshPlaylist();
      await this.spotifyPlaylistPageService.refreshPlaylist();
    } else {
      this.spotifyService.play(row[ 'uri' ]);
    }
  }

  public async onVoteUp(proposal) {
    const { votes } = proposal;
    const userIds = votes.map((vote) => vote.id);

    if ( userIds.indexOf(this.securityService.user.id) === -1 ) {
      this.communityDetailPageService.vote(proposal);
    } else {
      this.communityDetailPageService.deleteVote(proposal);
    }
  }

  public async onVoteDown(proposal) {
    const { votes } = proposal;
    const userIds = votes.map((vote) => vote.id);

    if ( userIds.indexOf(this.securityService.user.id) === -1 ) {
      this.communityDetailPageService.vote(proposal);
    } else {
      this.communityDetailPageService.deleteVote(proposal);
    }
  }

  public async onAccept(proposal) {
    await this.communityDetailPageService.accept(proposal.songId);
    await this.communityDetailPageService.refreshPlaylist();
    await this.spotifyPlaylistPageService.refreshPlaylist();
  }

  public async onRestore(proposal) {
    await this.communityDetailPageService.restore(proposal.songId);
    await this.communityDetailPageService.refreshPlaylist();
    await this.spotifyPlaylistPageService.refreshPlaylist();
  }

  public async onDecline(proposal) {
    await this.communityDetailPageService.decline(proposal.songId);
    await this.communityDetailPageService.refreshPlaylist();
    await this.spotifyPlaylistPageService.refreshPlaylist();
  }

  public onTabChange(tab: TabItem) {
    if ( tab.key === 'settings' ) {
      this.updateModalVisible = true;
      this.activeTab = _.find(this.communityDetailPageService.tabs, { key: 'playlist' });
    } else {
      this.activeTab = tab;
      this.location.go(`/community/${this.id}/${this.activeTab.key}`);
    }
  }

  public openInSpotify() {
    window.open(this.spotifyPlaylistPageService.playlist.uri);
  }

  public async onDelete() {
    await this.communityDetailPageService.delete();
  }

  public async onUpdate() {
    if ( !_.isNil(this.communityDetailPageService.community.name) && this.communityDetailPageService.community.name !== '' ) {
      this.updateModalVisible = false;

      await this.communityDetailPageService.update();
      await this.communityDetailPageService.refreshPlaylist();
      await this.spotifyPlaylistPageService.refreshPlaylist();
    }
  }
}
