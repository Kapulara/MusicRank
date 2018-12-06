import { Injectable } from '@angular/core';

@Injectable()
export class MenuService {

  public isVisible: boolean = true;

  public setVisible(state: boolean) {
    this.isVisible = state;
  }

}
