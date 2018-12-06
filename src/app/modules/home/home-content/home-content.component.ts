import { Component } from '@angular/core';
import { AppState } from '../../../app.service';
import { SideBarService } from '../../../shared/side-bar/side-bar.service';

@Component({
  selector: 'mr-home-content',
  templateUrl: './home-content.component.html'
})
export class HomeContentComponent {

  public state = true;

  constructor(
    private appState: AppState,
    private sideBarService: SideBarService
  ) {
  }

  public async test() {
    if ( this.state ) {
      await this.sideBarService.setImageSource('/assets/img/background/abigail-lynn-1177253-unsplash.jpg', true);
      this.sideBarService.setSmall(true);
      this.sideBarService.setBlur(true);
      this.state = false;
    } else {
      await this.sideBarService.setImageSource('/assets/img/background/junior-pereira-73904-unsplash.jpg', true);
      this.sideBarService.setSmall(false);
      this.sideBarService.setBlur(false);
      this.state = true;
    }
  }

}
