import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { SideBarService } from '../../../shared/side-bar/side-bar.service';
import { SideBarStyles } from '../../../shared/side-bar/side-bar.styles';

@Component({
  selector: 'uz-login-redirect',
  templateUrl: './login-redirect.component.html'
})
export class LoginRedirectComponent implements OnDestroy, AfterViewInit {

  private timeout = null;

  constructor(
    private sideBarService: SideBarService
  ) {
  }

  public ngAfterViewInit() {
    this.timeout = setTimeout(() => window.location.href = 'http://localhost:9090/v1/spotify', 3000);

    this.init();
  }

  public ngOnDestroy() {
    clearTimeout(this.timeout);
  }

  public async init() {
    await this.sideBarService.set(SideBarStyles.LoginRedirect);
  }
}
