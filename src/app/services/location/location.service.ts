import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import 'rxjs/Rx';

@Injectable()
export class LocationService {

  constructor(private _http: Http) { }

  getLocations(cityName: string = null) {
    let url = '/api/api/geo/city';

    if (cityName !== null) {
      url = `${url}/?title=${cityName}`;
    }

    return this._http.get(url).map((response: Response) => response.json());
  }

}
