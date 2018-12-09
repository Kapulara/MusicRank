import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { Subscription } from 'rxjs';
import { TableColumn } from '../../../shared/table/table.component';
import { SpotifyAlbumPageService } from './spotify-album-page.service';

@Component({
  selector: 'mr-spotify-album-page',
  templateUrl: './spotify-album-page.component.html'
})
export class SpotifyAlbumPageComponent implements AfterViewInit, OnDestroy {

  public columns: TableColumn[] = [
    {
      key: 'index',
      name: '#'
    },
    {
      type: 'image',
      key: 'image'
    },
    {
      key: 'name',
      name: 'Name',
      fill: true
    },
    {
      key: 'time',
      icon: 'mr-time-countdown-2'
    }
  ];

  @ViewChild('spotifyAlbumSideBar')
  private spotifyAlbumSideBar: ElementRef;
  private subscription: Subscription = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    public spotifyAlbumPageService: SpotifyAlbumPageService,
    private changeDetectorRef: ChangeDetectorRef
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

}
