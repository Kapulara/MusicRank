import { ChangeDetectorRef, Component, ElementRef, HostListener } from '@angular/core';
import { P } from '@angular/core/src/render3';
import { CommunityPageService } from '../../community/community-page/community-page.service';
import { SpotifySongDropdownService } from './spotify-song-dropdown.service';

@Component({
  selector: 'mr-spotify-song-dropdown',
  templateUrl: './spotify-song-dropdown.component.html'
})
export class SpotifySongDropdownComponent {
  constructor(
    public spotifySongDropdownService: SpotifySongDropdownService,
    public communityPageService: CommunityPageService,
    private changeDetectorRef: ChangeDetectorRef,
    private elementRef: ElementRef
  ) {
    this.spotifySongDropdownService.update$
      .subscribe(() => {
        console.log('update received');
        this.changeDetectorRef.detectChanges();
      });
    this.communityPageService.load();
  }

  /**
   * This is the function used to check if we click outside of the search item.
   * @param {MouseEvent} $event
   */
  @HostListener('document:click', [ '$event' ])
  public onClickedOutsideSearch($event: MouseEvent) {

    // TODO: Check if this works on every browser.
    const path: any[] = $event[ 'path' ] || [];

    let found = false;

    // Loops over all of the nodes to the currentTarget
    /* tslint:disable */
    for (let pathIndex = 0; pathIndex < path.length; pathIndex++) {

      // Checks if it is a HTML Node & Is inside of our nativeElement (this component)
      if ( path[ pathIndex ] && path[ pathIndex ].nodeType &&
        this.elementRef.nativeElement.contains(path[ pathIndex ]) ) {

        found = true;
        break;
      }
    }

    // If we didn't find a match we want to hide.
    if ( found === false ) {
      this.spotifySongDropdownService.hide();
    }
  }

  public async onDropdownItemClick(community) {
    this.spotifySongDropdownService.hide();
    if ( !this.isDisabled(community) ) {
      console.log('Adding to', community);
      community.isLoading = true;
      try {
        await this.communityPageService.propose(community.id, this.spotifySongDropdownService.id);
      } catch (e) {
        console.error(e);
      }
      community.isLoading = false;
    }
  }

  /**
   * Is Community Disabled
   * @param community
   */
  public isDisabled(community) {
    return community.songProposals
      .map((songProposal) => songProposal.songId)
      .indexOf(this.spotifySongDropdownService.id) > -1;
  }
}
