import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import { Subscription } from 'rxjs';
import { TableColumn } from '../../../shared/table/table.component';
import { SpotifyUserPageService } from './spotify-user-page.service';

@Component({
  selector: 'mr-spotify-user-page',
  templateUrl: './spotify-user-page.component.html'
})
export class SpotifyUserPageComponent implements AfterViewInit, OnDestroy {

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

  @ViewChild('spotifyUserSideBar')
  private spotifyUserSideBar: ElementRef;

  private subscription: Subscription = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    public spotifyUserPageService: SpotifyUserPageService,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router
  ) {
    this.subscription = this.spotifyUserPageService
      .isLoading$
      .subscribe(() => this.changeDetectorRef.detectChanges());
  }

  public ngAfterViewInit() {
    this.activatedRoute.params.subscribe(({ id }) => this.spotifyUserPageService.load(id, this.spotifyUserSideBar));
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
