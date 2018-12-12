import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { Subscription } from 'rxjs';
import { TableColumn } from '../../../shared/table/table.component';
import { SpotifyService } from '../spotify.service';
import { SpotifyAlbumPageService } from './spotify-album-page.service';

@Component({
  selector: 'mr-spotify-album-page',
  templateUrl: './spotify-album-page.component.html'
})
export class SpotifyAlbumPageComponent implements AfterViewInit, OnDestroy {

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
      key: 'time',
      icon: 'mr-time-countdown-2',
      hover: true
    }
  ];

  @ViewChild('spotifyAlbumSideBar')
  private spotifyAlbumSideBar: ElementRef;
  private subscription: Subscription = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    public spotifyAlbumPageService: SpotifyAlbumPageService,
    private changeDetectorRef: ChangeDetectorRef,
    private spotifyService: SpotifyService
  ) {
    this.subscription = this.spotifyAlbumPageService
      .isLoading$
      .subscribe(() => this.changeDetectorRef.detectChanges());
  }

  public ngAfterViewInit() {
    this.activatedRoute.params.subscribe(({ id }) => this.spotifyAlbumPageService.load(id, this.spotifyAlbumSideBar));
  }

  public ngOnDestroy() {
    if ( !_.isNil(this.subscription) ) {
      this.subscription.unsubscribe();
    }
  }

  public async onRowClick({ row, column }) {
    if ( row[ 'uri' ].indexOf('track') > -1 ) {
      const track = _.findKey(this.spotifyAlbumPageService.album.tracks.items, { id: row.id });

      if ( !_.isNil(track) ) {
        const position = parseInt(track, 10);

        this.spotifyService.play({
          context_uri: this.spotifyAlbumPageService.album.uri,
          offset: {
            position
          },
          position_ms: 0
        });
      }
    } else {
      this.spotifyService.play(row[ 'uri' ]);
    }
  }
}
