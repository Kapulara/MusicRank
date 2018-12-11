import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SecurityService } from '../../../core/security/security.service';
import { SideBarService } from '../../../shared/side-bar/side-bar.service';
import { SideBarStyles } from '../../../shared/side-bar/side-bar.styles';

@Component({
  selector: 'mr-login-loading-page',
  template: `
    <mr-center>
      <div class="page-loading"></div>
      <div class="page-loading-text"><h2>Loading user...</h2></div>
    </mr-center>
  `
})
export class LoginLoadingPageComponent {
  private returnUrl: string;

  constructor(
    private sideBarService: SideBarService,
    private securityService: SecurityService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.sideBarService.set(SideBarStyles.LoginLoadingPage);
    this.init();
    this.returnUrl = this.activatedRoute.snapshot.queryParams[ 'returnUrl' ] || '/';
  }

  public async init() {
    this.check();
    this.securityService
      .user$
      .subscribe(() => this.check());
  }

  public check() {
    if ( this.securityService.user !== null || this.securityService.doneLoading ) {
      this.router.navigateByUrl(this.returnUrl, { replaceUrl: true });
    }
  }
}
