import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { SecurityService } from '../../../core/security/security.service';
import { SideBarService } from '../../../shared/side-bar/side-bar.service';
import { SideBarStyles } from '../../../shared/side-bar/side-bar.styles';

@Component({
  selector: 'mr-failure-page',
  templateUrl: './login-failure-page.component.html'
})
export class LoginFailurePageComponent implements OnDestroy {

  public counter: number = 10;
  private timeout: any = null;

  constructor(
    public securityService: SecurityService,
    private sideBarService: SideBarService,
    private router: Router
  ) {
    this.init();
    this.startCountdown();
  }

  public ngOnDestroy() {
    clearTimeout(this.timeout);
  }

  public async init() {
    await this.sideBarService.set(SideBarStyles.LoginFailurePage);
  }

  public redirect() {
    if ( this.securityService.user === null ) {
      this.router.navigateByUrl('/home', { queryParams: null, replaceUrl: true });
    } else {
      this.router.navigateByUrl('/login/account', { queryParams: null, replaceUrl: true });
    }
  }

  private startCountdown() {
    this.timeout = setTimeout(() => this.tick(), 1000);
  }

  private tick() {
    this.counter--;

    if ( this.counter === 0 ) {
      this.redirect();
    } else {
      this.timeout = setTimeout(() => this.tick(), 1000);
    }
  }
}
