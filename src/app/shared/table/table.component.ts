import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { SpotifySongDropdownService } from '../../modules/spotify/spotify-song-dropdown/spotify-song-dropdown.service';
import { SpotifyService } from '../../modules/spotify/spotify.service';

export interface TableColumn {
  icon?: string;
  name?: string;
  type?: string;
  fill?: boolean;
  hover?: boolean;
  key: string;
}

@Component({
  selector: 'mr-table',
  templateUrl: './table.component.html'
})
export class TableComponent {
  @Input() public columns: TableColumn[] = [];
  @Input() public rows: any[] = [];
  @Input() public cap = null;
  @Output() public onRowClick: EventEmitter<any> = new EventEmitter();
  @Output() public onContextClick: EventEmitter<any> = new EventEmitter();
  public showCap: boolean = false;

  constructor(
    public spotifyService: SpotifyService,
    private spotifySongDropdownService: SpotifySongDropdownService,
    private elementRef: ElementRef
  ) {
  }

  public triggerClickEvent(
    row: any,
    column: TableColumn
  ) {
    this.onRowClick.next({
      row,
      column
    });
  }

  public showContextMenu() {
    return true;
  }

  public checkOutside($event) {
    const path: any[] = $event[ 'path' ] || [];
    let found = false;
    // Loops over all of the nodes to the currentTarget
    /* tslint:disable */
    console.log(path.length);
    // for (let pathIndex = 0; pathIndex < path.length; pathIndex++) {
    //
    //   // Checks if it is a HTML Node & Is inside of our nativeElement (this component)
    //   if ( path[ pathIndex ] && path[ pathIndex ].nodeType &&
    //     this.elementRef.nativeElement.contains(path[ pathIndex ]) ) {
    //
    //     found = true;
    //     break;
    //   }
    // }
    //
    // // If we didn't find a match we want to hide.
    // if ( found === false ) {
    //   this.spotifySongDropdownService.hide();
    // }
  }

  public triggerContextEvent(
    row: any,
    column: TableColumn,
    mouseEvent: MouseEvent
  ) {
    this.spotifySongDropdownService.open(mouseEvent.clientX, mouseEvent.clientY, row.trackId || null);
    return false;
  }
}
