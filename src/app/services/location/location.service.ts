import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import 'rxjs/Rx';

@Injectable()
export class LocationService {

  private urls = {
    locations: 'api.zolushka.ru/locations'
  };

  constructor(private http: Http) { }

  getLocations(cityName: string = null) {
    let url = this.urls.locations;

    if (cityName !== null) {
      url = `${url}/${cityName}`;
    }

    return this.http.get(url).map((response: Response) => response.json());
  }

}
