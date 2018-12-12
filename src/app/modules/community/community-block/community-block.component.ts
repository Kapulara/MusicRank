import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'mr-community-block',
  templateUrl: './community-block.component.html'
})
export class CommunityBlockComponent {
  @Input() public isAdmin: boolean = false;
  @Input() public image: any;
  @Input() public title: string;
  @Input() public underTitle: string = null;
}
