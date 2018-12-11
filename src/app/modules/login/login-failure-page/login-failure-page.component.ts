import { Component } from '@angular/core';
import { SecurityService } from '../../../core/security/security.service';
import { SideBarService } from '../../../shared/side-bar/side-bar.service';
import { SideBarStyles } from '../../../shared/side-bar/side-bar.styles';

@Component({
  selector: 'mr-failure-page',
  templateUrl: './login-failure-page.component.html'
})
export class LoginFailurePageComponent {
  constructor(
    public securityService: SecurityService,
    private sideBarService: SideBarService
  ) {
    this.init();
    this.securityService.logout(false);
  }

  public async init() {
    await this.sideBarService.set(SideBarStyles.LoginFailurePage);
  }
}
