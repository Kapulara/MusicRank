import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import { Subscription } from 'rxjs';
import { TableColumn } from '../../../shared/table/table.component';
import { SpotifySearchPageService } from './spotify-search-page.service';

@Component({
  selector: 'mr-spotify-search-page',
  templateUrl: './spotify-search-page.component.html'
})
export class SpotifySearchPageComponent implements AfterViewInit, OnDestroy {

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
      key: 'album',
      type: 'album',
      hover: true,
      name: 'Album'
    },
    {
      key: 'time',
      icon: 'mr-time-countdown-2'
    },
    {
      key: 'popularity',
      type: 'popularity'
    },
  ];

  private subscription: Subscription = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    public spotifySearchPageService: SpotifySearchPageService,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router
  ) {
    this.subscription = this.spotifySearchPageService
      .isLoading$
      .subscribe(() => this.changeDetectorRef.detectChanges());
  }

  public ngAfterViewInit() {
    this.activatedRoute.params.subscribe(({ query }) => this.spotifySearchPageService.load(query));
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
    }
  }

}
