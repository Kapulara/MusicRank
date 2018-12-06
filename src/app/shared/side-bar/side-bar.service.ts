import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AppState } from '../../app.service';

@Injectable()
export class SideBarService {

  /**
   * Is the sidebar blurred
   */
  public blur: boolean = false;

  /**
   * Image Source
   */
  public imgSrc: string = '/assets/img/background/junior-pereira-73904-unsplash.jpg';

  /**
   * Image Source Change
   */
  public imgSrc$: Subject<string> = new Subject();

  /**
   * Image Loaded
   */
  public imgLoaded = false;

  /**
   * Image Loaded
   */
  public imgLoaded$: Subject<string> = new Subject();

  /**
   * @param appState
   */
  constructor(
    private appState: AppState
  ) {
  }

  public setImageLoaded(
    source: string,
    state: boolean
  ) {
    if ( state && this.imgSrc === source ) {
      this.imgLoaded = state;
      this.imgLoaded$.next(source);
    } else {
      this.imgLoaded = false;
    }

    console.log(this.imgLoaded);
  }

  public async setImageSource(
    source: string,
    waitForLoad = false
  ) {
    this.imgSrc = source;
    this.imgSrc$.next(this.imgSrc);

    if ( waitForLoad ) {
      const result = await new Promise((
        resolve
      ) => {
        this.imgLoaded$.subscribe((loadedSource) => {
          if ( loadedSource === source ) {
            resolve(true);
            return;
          }

          resolve(false);
        });
      });

      return result;
    }

    return;
  }

  public setBlur(state: boolean) {
    this.blur = state;
  }

  public setSmall(state: boolean) {
    this.appState.small = state;
  }
}
