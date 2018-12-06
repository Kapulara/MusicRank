import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SecurityService } from '../../../core/security/security.service';

@Component({
  selector: 'uz-login-token',
  templateUrl: './login-token.component.html'
})
export class LoginTokenComponent {
  constructor(
    private route: ActivatedRoute,
    private securityService: SecurityService
  ) {
    this.route
      .queryParams
      .subscribe(({ token }) => {

      });
  }
}
