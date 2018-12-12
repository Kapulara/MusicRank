import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { Subscription } from 'rxjs';
import { ApiService } from '../../../core/security/api.service';
import { SideBarService } from '../../../shared/side-bar/side-bar.service';
import { SideBarStyles } from '../../../shared/side-bar/side-bar.styles';

@Component({
  selector: 'mr-login-redirect-page',
  templateUrl: './login-redirect-page.component.html'
})
export class LoginRedirectPageComponent implements OnDestroy, AfterViewInit {

  private timeout = null;
  private subscriptions: Subscription[] = [];
  private showDialog = false;

  constructor(
    private sideBarService: SideBarService,
    private route: ActivatedRoute
  ) {
    this.subscriptions.push(route.queryParams.subscribe(({ dialog }) => {
      if ( !_.isNil(dialog) ) {
        this.showDialog = true;
      }
    }));

    this.init();
  }

  public ngAfterViewInit() {
    let url = `${ApiService.host}/v1/spotify`;
    if ( this.showDialog ) {
      url = `${ApiService.host}/v1/spotify/dialog`;
    }

    this.timeout = setTimeout(() => window.location.replace(url), 1000);
  }

  public ngOnDestroy() {
    clearTimeout(this.timeout);
    this.subscriptions.map((subscription) => subscription.unsubscribe());
  }

  public async init() {
    await this.sideBarService.set(SideBarStyles.LoginRedirectPage);
  }
}
