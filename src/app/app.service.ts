import { Injectable } from '@angular/core';

@Injectable()
export class AppState {
  /**
   * State if the Application Small is
   */
  public small: boolean = false;

  /**
   * State if the Application Small is
   */
  public transition: boolean = true;

  /**
   * Show the background
   */
  public showBackground: boolean = false;
}
