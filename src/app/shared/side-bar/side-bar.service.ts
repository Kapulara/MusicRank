import { ElementRef, Injectable } from '@angular/core';
import * as _ from 'lodash';
import { Subject } from 'rxjs';
import { AppState } from '../../app.service';

@Injectable()
export class SideBarService {

  /**
   * Is the sidebar blurred
   */
  public blur: boolean = false;

  /**
   * Template
   */
  public templateRef: ElementRef = null;

  /**
   * Template Context
   */
  public templateContext: any = {};

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

  public index = 1;
  public zIndex = 9999;

  /**
   * Images
   */
  public images = [];

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
    small = false
  ) {
    this.index++;
    this.zIndex--;

    this.images.push({
      'index': _.clone(this.index),
      'z-index': _.clone(this.zIndex),
      'visible': true,
      'small': small,
      'source': source
    });

    this.images
      .filter((image) => image.index !== this.index)
      .map((image) => image.visible = false);
  }

  public setBlur(state: boolean) {
    this.blur = state;
  }

  public setSmall(state: boolean) {
    this.appState.small = state;
  }

  public async set(settings: {
    small?: boolean;
    blur?: boolean;
    source?: string;
    template?: ElementRef;
    templateContext?: any;
    smallImage?: boolean;
    showBackground?: boolean;
    waitLoadSource?: boolean;
  }) {
    const small = _.get(settings, 'small', false);
    const blur = _.get(settings, 'blur', false);
    const smallImage = _.get(settings, 'smallImage', false);
    const template = _.get(settings, 'template', null);
    const templateContext = _.get(settings, 'templateContext', {});
    const showBackground = _.get(settings, 'showBackground', false);
    const source = _.get(settings, 'source', '/assets/img/background/junior-pereira-73904-unsplash.jpg');
    const waitLoadSource = _.get(settings, 'waitLoadSource', false);

    this.appState.showBackground = showBackground;
    this.setSmall(small);
    this.setBlur(blur);

    this.templateRef = template;
    this.templateContext = templateContext;

    if ( waitLoadSource ) {
      await this.setImageSource(source, smallImage);
    } else {
      this.setImageSource(source, smallImage);
    }
  }
}
