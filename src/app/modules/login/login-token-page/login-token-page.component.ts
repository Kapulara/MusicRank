import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import { Subscription } from 'rxjs';
import { SecurityService } from '../../../core/security/security.service';
import { SideBarService } from '../../../shared/side-bar/side-bar.service';
import { SideBarStyles } from '../../../shared/side-bar/side-bar.styles';

@Component({
  selector: 'mr-login-token-page',
  templateUrl: './login-token-page.component.html'
})
export class LoginTokenPageComponent implements OnDestroy {

  public name: string = null;
  public counter: number = 5;
  private timeout: any = null;
  private subscriptions: Subscription[] = [];

  constructor(
    public securityService: SecurityService,
    private route: ActivatedRoute,
    private router: Router,
    private sideBarService: SideBarService
  ) {
    this.subscriptions.push(
      this.route
        .queryParams
        .subscribe(async ({ token }) => {
          await this.securityService.load(token);
          await this.router.navigateByUrl('/login/token', { queryParams: null, replaceUrl: true });
        }),
      this.securityService.user$.subscribe((user) => this.setName(user))
    );

    this.setName(this.securityService.user);

    this.startCountdown();
    this.init();
  }

  public ngOnDestroy() {
    clearTimeout(this.timeout);
    this.subscriptions.map((subscription) => subscription.unsubscribe());
  }

  public async init() {
    await this.sideBarService.set(SideBarStyles.LoginTokenPage);
  }

  private setName(user: any) {
    if ( _.isNil(user) ) {
      return;
    }

    this.name = user.name.split(' ')[ 0 ];
  }

  private startCountdown() {
    this.timeout = setTimeout(() => this.tick(), 1000);
  }

  private tick() {
    this.counter--;

    if ( this.counter === 0 ) {
      this.router.navigateByUrl('/home', { queryParams: null, replaceUrl: true });
    } else {
      this.timeout = setTimeout(() => this.tick(), 1000);
    }
  }
}
