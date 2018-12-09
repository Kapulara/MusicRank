import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { Subject } from 'rxjs';
import { ApiService } from './api.service';

@Injectable()
export class SecurityService {

  public user = null;
  public user$ = new Subject();
  public token = null;
  public hasToken = false;
  public tokenVerified = false;
  public doneLoading = false;

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) {
    this.init();
  }

  public async init() {
    await this.load();
  }

  public async load(token = null) {
    if ( token === null ) {
      token = localStorage.getItem('Auth.Token');
    }
    this.doneLoading = false;

    if ( !_.isNil(token) ) {
      this.token = token;
      this.hasToken = true;

      try {
        const { err, data: user } = await this.whoAmI();

        if ( !err && this.hasToken && !_.isNil(user) ) {
          this.tokenVerified = true;
          this.user = user;
          this.user$.next(this.user);
          this.save(token);
          this.doneLoading = true;
          return;
        }
      } catch (err) {
        console.error(err);
      }

      this.token = null;
      this.hasToken = false;
      this.tokenVerified = false;
    } else {
      this.hasToken = false;
    }

    this.user$.next(this.user);
    this.doneLoading = true;
  }

  public save(token: string) {
    localStorage.setItem('Auth.Token', token);
  }

  public generateRequestOptions() {
    if ( !this.hasToken ) {
      return {};
    } else {
      return {
        headers: new HttpHeaders({
          'X-User-Token': this.token
        })
      };
    }
  }

  public async whoAmI(): Promise<any> {
    return this.httpClient
      .get(`${ApiService.host}/v1/user/whoAmI`, this.generateRequestOptions())
      .toPromise();
  }

  public async logout(redirect = true) {
    localStorage.removeItem('Auth.Token');
    this.token = null;
    this.hasToken = false;
    this.tokenVerified = false;
    this.user = null;
    this.user$.next(this.user);
    await this.load();

    if ( redirect ) {
      this.router.navigateByUrl('/', { replaceUrl: true });
    }
  }
}
