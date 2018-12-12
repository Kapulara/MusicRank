import { Component, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { SecurityService } from '../../../../core/security/security.service';
import { SpotifyService } from '../../../spotify/spotify.service';
import { CommunityDetailPageService } from '../community-detail-page.service';

@Component({
  selector: 'mr-community-song-proposal',
  templateUrl: './community-song-proposal.component.html'
})
export class CommunitySongProposalComponent {
  @Input() public proposal: any;
  @Input() public denied: boolean = false;
  @Output() public onVoteUp: Subject<any> = new Subject<any>();
  @Output() public onVoteDown: Subject<any> = new Subject<any>();
  @Output() public onAccept: Subject<any> = new Subject<any>();
  @Output() public onRestore: Subject<any> = new Subject<any>();
  @Output() public onDeny: Subject<any> = new Subject<any>();

  constructor(
    public communityDetailPageService: CommunityDetailPageService,
    private spotifyService: SpotifyService,
    private securityService: SecurityService
  ) {
  }

  public play(uri) {
    this.spotifyService.play(uri);
  }

  public voteUp() {
    this.onVoteUp.next();
  }

  public voteDown() {
    this.onVoteDown.next();
  }

  public accept() {
    this.onAccept.next();
  }

  public restore() {
    this.onRestore.next();
  }

  public decline() {
    this.onDeny.next();
  }

  public hasVoted(): boolean {
    const { votes } = this.proposal;
    const userIds = votes.map((vote) => vote.id);
    return userIds.indexOf(this.securityService.user.id) > -1;
  }
}
