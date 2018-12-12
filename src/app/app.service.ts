import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

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
  public scrollObservable$: Observable<any> = null;
  public initScrollObservable$: Subject<Observable<any>> = new Subject<Observable<any>>();
}
