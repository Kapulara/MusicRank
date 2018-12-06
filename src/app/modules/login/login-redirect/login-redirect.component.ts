import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'uz-login-redirect',
  templateUrl: './login-redirect.component.html'
})
export class LoginRedirectComponent implements AfterViewInit {
  constructor(
  ) {
  }

  public ngAfterViewInit() {
    window.location.href = 'http://localhost:9090/v1/spotify';
  }
}
