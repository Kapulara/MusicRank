import { Component } from '@angular/core';
import { SideBarService } from '../../../shared/side-bar/side-bar.service';
import { SideBarStyles } from '../../../shared/side-bar/side-bar.styles';

@Component({
  selector: 'mr-dashboard-page',
  templateUrl: './dashboard-page.component.html'
})
export class DashboardPageComponent {
  constructor(
    private sideBarService: SideBarService
  ) {
    this.sideBarService.set(SideBarStyles.DashboardPage);
  }
}
