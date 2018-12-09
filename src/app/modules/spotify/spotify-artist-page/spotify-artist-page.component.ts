import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TableColumn } from '../../../shared/table/table.component';
import { SpotifyAlbumPageService } from '../spotify-album-page/spotify-album-page.service';
import { SpotifyArtistPageService } from './spotify-artist-page.service';

@Component({
  selector: 'mr-spotify-artist-page',
  templateUrl: './spotify-artist-page.component.html'
})
export class SpotifyArtistPageComponent implements AfterViewInit {
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
    }
  ];

  @ViewChild('spotifyArtistSideBar')
  private spotifyArtistSideBar: ElementRef;

  constructor(
    public spotifyArtistPageService: SpotifyArtistPageService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
  }

  public ngAfterViewInit() {
    this.activatedRoute.params.subscribe(({ id }) => this.spotifyArtistPageService.load(id, this.spotifyArtistSideBar));
  }

  public onRowClick({ row, column }) {
    const columnWithType: TableColumn = column;
    console.log(columnWithType);
    if ( columnWithType.type === 'album' ) {
      this.router.navigate([ '/s/album/' + row[ columnWithType.key ].id ]);
    }
  }
}
