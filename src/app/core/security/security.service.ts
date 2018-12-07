import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { ApiService } from './api.service';

@Injectable()
export class SecurityService {

  public token = null;
  public hasToken = false;
  public tokenVerified = false;

  constructor(
    private httpClient: HttpClient
  ) {
    this.load(true);
  }

  public async load(verify = false) {
    const token = localStorage.getItem('Auth.Token');

    if ( !_.isNil(token) ) {
      this.token = token;
      this.hasToken = true;

      if ( verify ) {
        const user = await this.whoAmI();

        console.log(user);
      }
    } else {
      this.hasToken = false;
    }
  }

  public async save(token: string) {

  }

  public generateRequestOptions() {
    if ( !this.hasToken ) {
      return {};
    } else {
      return {
        headers: new HttpHeaders({
          'X-User-Token': this.token + 'a'
        })
      };
    }
  }

  public async whoAmI() {
    return this.httpClient
      .get(`${ApiService.host}/v1/user/whoAmI`, this.generateRequestOptions())
      .toPromise();
  }
}
