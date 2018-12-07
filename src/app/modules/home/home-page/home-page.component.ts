import { Component } from '@angular/core';
import { SideBarService } from '../../../shared/side-bar/side-bar.service';
import { SideBarStyles } from '../../../shared/side-bar/side-bar.styles';

@Component({
  selector: 'mr-home-page',
  templateUrl: './home-page.component.html'
})
export class HomePageComponent {
  constructor(
    private sideBarService: SideBarService
  ) {
    this.init();
  }

  public async init() {
    await this.sideBarService.set(SideBarStyles.Home);
  }
}
