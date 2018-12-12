import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import * as _ from 'lodash';
import { ApiService } from '../../../core/security/api.service';
import { SecurityService } from '../../../core/security/security.service';
import { SideBarService } from '../../../shared/side-bar/side-bar.service';
import { CommunityPageService } from './community-page.service';

@Component({
  selector: 'mr-community-page',
  templateUrl: './community-page.component.html'
})
export class CommunityPageComponent {

  public createName: string;
  public updateName: string;
  public createModalVisible: boolean = false;
  public updateModalVisible: boolean = false;
  @ViewChild('communityPageSideBar')
  private communityPageSideBar: ElementRef;

  constructor(
    public communityPageService: CommunityPageService,
    private sideBarService: SideBarService,
    private httpClient: HttpClient,
    private securityService: SecurityService
  ) {
    this.sideBarService.set({
      source: '/assets/img/background/junior-pereira-73904-unsplash.jpg',
      blur: true,
      small: true
    });

    this.communityPageService.load();
  }

  public async onCreate() {
    console.log(this.createName);
    if ( !_.isNil(this.createName) && this.createName !== '' ) {
      await this.communityPageService.create(this.createName);
      await this.communityPageService.load();

      this.createModalVisible = false;
      this.createName = '';
    }
  }

  public async onUpdate() {
    console.log(this.updateName);
    if ( !_.isNil(this.updateName) && this.updateName !== '' ) {
      this.updateModalVisible = false;
      this.updateName = '';
    }
  }
}
