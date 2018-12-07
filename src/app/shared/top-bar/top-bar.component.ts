import { Component } from '@angular/core';
import { SecurityService } from '../../core/security/security.service';

@Component({
  selector: 'mr-top-bar',
  templateUrl: './top-bar.component.html'
})
export class TopBarComponent {
  constructor(
    private securityService: SecurityService
  ) {
  }
}
