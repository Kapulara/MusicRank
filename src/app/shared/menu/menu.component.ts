import { Component } from '@angular/core';
import { SecurityService } from '../../core/security/security.service';
import { MenuService } from './menu.service';

@Component({
  selector: 'mr-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent {

  constructor(
    public menuService: MenuService,
    public securityService: SecurityService
  ) {}
}
