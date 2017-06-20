import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import 'rxjs/Rx';

@Injectable()
export class LocationService {

  constructor(private _http: Http) { }

  getLocations(cityName: string = null) {
    let url = 'api.zolushka.ru/locations';

    if (cityName !== null) {
      url = `${url}/${cityName}`;
    }

    return this._http.get(url).map((response: Response) => response.json());
  }

}
