/**
 * Angular 2 decorators and services
 */
import { AfterViewInit, Component, ViewEncapsulation } from '@angular/core';
import { ScrollSpyService } from 'ngx-scrollspy';
import { AppState } from './app.service';

export const ROOT_SELECTOR = 'app';

/**
 * App Component
 * Top Level Component
 */
@Component({
  selector: ROOT_SELECTOR,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './app.component.html'
})
export class AppComponent implements AfterViewInit {
  constructor(
    public appState: AppState,
    private scrollSpyService: ScrollSpyService
  ) {
  }

  public ngAfterViewInit() {
    this.appState.scrollObservable$ = this.scrollSpyService.getObservable('right-container');
    this.appState.initScrollObservable$.next(this.appState.scrollObservable$);
  }
}
