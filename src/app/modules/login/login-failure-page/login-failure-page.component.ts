import { Component } from '@angular/core';
import { SideBarService } from '../../../shared/side-bar/side-bar.service';
import { SideBarStyles } from '../../../shared/side-bar/side-bar.styles';

@Component({
  selector: 'uz-failure-page',
  templateUrl: './login-failure-page.component.html'
})
export class LoginFailurePageComponent {
  constructor(
    private sideBarService: SideBarService
  ) {
    this.init();
  }

  public async init() {
    await this.sideBarService.set(SideBarStyles.LoginFailure);
  }
}
