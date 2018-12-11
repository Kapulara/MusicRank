import { Component, Input } from '@angular/core';

@Component({
  selector: 'mr-artist-album',
  templateUrl: './artist-album.component.html'
})
export class ArtistAlbumComponent {

  @Input() public image: string;
  @Input() public artist: boolean = false;
  @Input() public title: string;
  @Input() public underTitle: string = null;

}
