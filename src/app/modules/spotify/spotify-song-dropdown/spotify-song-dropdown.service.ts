import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { Subject } from 'rxjs';
import { AppState } from '../../../app.service';

@Injectable()
export class SpotifySongDropdownService {
  public visible: boolean = false;
  public clientX: number = 0;
  public clientY: number = 0;
  public id: string = null;
  public update$: Subject<boolean> = new Subject();

  private lastScrollTop = null;
  private lastScrollTarget = null;

  constructor(
    private appState: AppState
  ) {
    this.appState.initScrollObservable$.subscribe(() => {
      this.appState.scrollObservable$.subscribe((scroll: any) => this.update(scroll));
    });
  }

  public open(
    clientX: number,
    clientY: number,
    id: string
  ) {
    this.clientX = clientX;
    this.clientY = clientY;
    this.id = id;
    this.visible = true;
    console.log(this.id);
    this.update$.next(true);
  }

  public hide() {
    if ( this.visible ) {
      this.visible = false;
      this.update$.next(true);
    }
  }

  private update(scroll: any) {
    if ( !_.isNil(this.lastScrollTop) ) {
      this.clientY += this.lastScrollTop - scroll.target.scrollTop;
    }
    this.lastScrollTop = scroll.target.scrollTop + 0;
  }
}
