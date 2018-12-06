import { Component } from '@angular/core';
import { MenuService } from './menu.service';

@Component({
  selector: 'mr-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent {

  constructor(
    public menuService: MenuService
  ) {}
}
