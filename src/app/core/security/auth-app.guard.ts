import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import * as _ from 'lodash';
import { SecurityService } from '../security/security.service';

@Injectable()
export class AuthAppGuard implements CanActivate {

  /**
   * @param {router} router
   * @param {securityService} securityService
   */
  constructor(
    private router: Router,
    private securityService: SecurityService
  ) {
  }

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    return new Promise((
      resolve,
      reject
    ) => {
      console.log(route);
      if ( this.securityService.hasToken && this.securityService.tokenVerified ) {
        if ( this.securityService.user === null ) {
          this.router.navigate([ '/login/not-logged-in' ], { replaceUrl: true });
          resolve(false);
        } else {
          resolve(true);
        }
      } else {
        this.router.navigate([ '/login/loading' ], {
          replaceUrl: true,
          queryParams: {
            returnUrl: state.url
          }
        });
        resolve(false);
      }
    });
  }
}
