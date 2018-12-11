import { AfterViewInit, Component, Input } from '@angular/core';
import { SecurityService } from '../../../core/security/security.service';

@Component({
  selector: 'mr-login-user',
  templateUrl: './login-user.component.html'
})
export class LoginUserComponent {

  @Input() public margin: boolean = false;

  constructor(
    public securityService: SecurityService
  ) {
  }
}
