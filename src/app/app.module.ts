import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Injectable, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PreloadAllModules, RouterModule } from '@angular/router';
/*
 * Platform and Environment providers/directives/pipes
 */
import { environment } from 'environments/environment';

import '../styles/include.scss';
// App is our top level component
import { AppComponent } from './app.component';
import { ROUTES } from './app.routes';
import { AppState } from './app.service';
import { CoreModule } from './core/core.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { HomeModule } from './modules/home/home.module';
import { LoginModule } from './modules/login/login.module';
import { SpotifyModule } from './modules/spotify/spotify.module';
import { MenuModule } from './shared/menu/menu.module';
import { SharedModule } from './shared/shared.module';

// Application wide providers
const APP_PROVIDERS = [
  AppState
];

@Injectable()
export class CustomLocationStrategy extends HashLocationStrategy {
  public path(includeHash?: boolean): string {
    return '';
  }

  public pushState(
    state: any,
    title: string,
    url: string,
    queryParams: string
  ): void {
    console.log('push state called');
  }
}

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent
  ],
  /**
   * Import Angular's modules.
   */
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES, {
      useHash: true,
      preloadingStrategy: PreloadAllModules
    }),

    // Modules
    DashboardModule,
    HomeModule,
    LoginModule,
    SpotifyModule,

    // Extra
    CoreModule,
    SharedModule,
    MenuModule
  ],
  /**
   * Expose our Services and Providers into Angular's dependency injection.
   */
  providers: [
    environment.ENV_PROVIDERS,
    APP_PROVIDERS
  ]
})
export class AppModule {
}
