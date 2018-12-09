import { Component } from '@angular/core';
import { SecurityService } from '../../core/security/security.service';
import { SideBarService } from '../side-bar/side-bar.service';
import { SideBarStyles } from '../side-bar/side-bar.styles';

@Component({
  selector: 'mr-no-content',
  templateUrl: './no-content.component.html'
})
export class NoContentComponent {
  constructor(
    public securityService: SecurityService,
    private sideBarService: SideBarService
  ) {
    this.sideBarService.set(SideBarStyles.NotFound);
  }
}
