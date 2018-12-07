import { Injectable } from '@angular/core';

@Injectable()
export class ApiService {
  public static get host() {
    switch (ENV) {
      case 'development':
        return 'http://localhost:9090';
      default:
        return 'https://api.musicrank.club';
    }
  }
}
