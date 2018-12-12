import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import { Subscription } from 'rxjs';
import { TableColumn } from '../../../shared/table/table.component';
import { SpotifyService } from '../spotify.service';
import { SpotifyPlaylistPageService } from './spotify-playlist-page.service';

@Component({
  selector: 'mr-spotify-playlist-page',
  templateUrl: './spotify-playlist-page.component.html'
})
export class SpotifyPlaylistPageComponent implements AfterViewInit, OnDestroy {

  @ViewChild('spotifyPlaylistSideBar')
  private spotifyPlaylistSideBar: ElementRef;
  private subscription: Subscription = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    public spotifyPlaylistPageService: SpotifyPlaylistPageService,
    private changeDetectorRef: ChangeDetectorRef,
    private spotifyService: SpotifyService,
    private router: Router
  ) {
    this.subscription = this.spotifyPlaylistPageService
      .isLoading$
      .subscribe(() => this.changeDetectorRef.detectChanges());
  }

  public ngAfterViewInit() {
    this.activatedRoute.params.subscribe(({ id }) => this.spotifyPlaylistPageService.load(id, this.spotifyPlaylistSideBar));
  }

  public ngOnDestroy() {
    if ( !_.isNil(this.subscription) ) {
      this.subscription.unsubscribe();
    }
  }

  public onRowClick({ row, column }) {
    const columnWithType: TableColumn = column;
    console.log(columnWithType);
    if ( columnWithType.type === 'album' ) {
      this.router.navigate([ '/s/album/' + row[ columnWithType.key ].id ]);
    } else {
      this.spotifyService.playPlaylist(row['playlistUri'], row.index - 1);
    }
  }
}
