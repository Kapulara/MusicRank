import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SideBarService } from '../../../shared/side-bar/side-bar.service';
import { SideBarStyles } from '../../../shared/side-bar/side-bar.styles';

@Component({
  selector: 'mr-dashboard-page',
  templateUrl: './dashboard-page.component.html'
})
export class DashboardPageComponent {
  constructor(
    private sideBarService: SideBarService,
    private router: Router
  ) {
    this.sideBarService.set(SideBarStyles.DashboardPage);
    this.router.navigateByUrl('/community');
  }
}
