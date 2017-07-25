import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

@Injectable()
export class EnumsService {

    constructor(private _http: Http) {
    }

    getEnums(enumName: string = null) {
        let result;
        if (enumName) {
            result = this._http.get(`/api/api/reference/client/${enumName}`)
                .map(response => response.json());
        } else {
            result = this._http.get('/api/api/reference/client/list')
                .map(response => response.json());
        }

        return result;
    }

}
