import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import { Subscription } from 'rxjs';
import { SecurityService } from '../../../core/security/security.service';
import { SideBarService } from '../../../shared/side-bar/side-bar.service';
import { SideBarStyles } from '../../../shared/side-bar/side-bar.styles';

@Component({
  selector: 'mr-login-account-page',
  templateUrl: './login-account-page.component.html'
})
export class LoginAccountPageComponent implements OnDestroy {

  public name: string = null;
  private subscriptions: Subscription[] = [];

  constructor(
    public securityService: SecurityService,
    private route: ActivatedRoute,
    private router: Router,
    private sideBarService: SideBarService,
  ) {
    this.subscriptions.push(this.securityService.user$.subscribe((user) => this.setName(user)));
    this.setName(this.securityService.user);
    this.init();
  }

  public ngOnDestroy() {
    this.subscriptions.map((subscription) => subscription.unsubscribe());
  }

  public async init() {
    await this.sideBarService.set(SideBarStyles.LoginAccountPage);
  }

  private setName(user: any) {
    if ( _.isNil(user) ) {
      return;
    }

    this.name = user.name.split(' ')[ 0 ];
  }
}
