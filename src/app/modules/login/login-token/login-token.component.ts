import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SecurityService } from '../../../core/security/security.service';
import { SideBarService } from '../../../shared/side-bar/side-bar.service';
import { SideBarStyles } from '../../../shared/side-bar/side-bar.styles';

@Component({
  selector: 'uz-login-token',
  templateUrl: './login-token.component.html'
})
export class LoginTokenComponent {
  constructor(
    private route: ActivatedRoute,
    private sideBarService: SideBarService
  ) {
    this.route
      .queryParams
      .subscribe(({ token }) => {

      });

    this.init();
  }

  public async init() {
    await this.sideBarService.set(SideBarStyles.LoginToken);
  }
}
