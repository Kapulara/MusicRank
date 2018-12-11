import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { AppState } from '../../app.service';
import { SecurityService } from '../../core/security/security.service';
import { MenuService } from '../menu/menu.service';
import { SideBarService } from './side-bar.service';

@Component({
  selector: 'mr-side-bar',
  templateUrl: './side-bar.component.html'
})
export class SideBarComponent implements AfterViewInit {

  public transition: boolean = false;

  /**
   * Image Reference
   */
  @ViewChild('imageContainer')
  public imageContainer: ElementRef;

  constructor(
    public sideBarService: SideBarService,
    public securityService: SecurityService,
    public appState: AppState,
    public menuService: MenuService
  ) {
  }

  /**
   * After View Init
   */
  public ngAfterViewInit(): void {
    this.transition = true;
  }
}
