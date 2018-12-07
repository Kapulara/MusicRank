import { Component } from '@angular/core';
import { SideBarService } from '../side-bar/side-bar.service';
import { SideBarStyles } from '../side-bar/side-bar.styles';

@Component({
  selector: 'no-content',
  template: `
    <mr-top-bar></mr-top-bar>
    <mr-center>
      <h1>Page not found...</h1>
      <br/>
      <div class="button button--yellow"
           [routerLink]="'/'">
        Home
      </div>
    </mr-center>
  `
})
export class NoContentComponent {
  constructor(private sideBarService: SideBarService) {
    this.sideBarService.set(SideBarStyles.NotFound);
  }
}
