import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { UserService } from '../user/user.service';

@Injectable()
export class HttpService {

    constructor(private _http: Http, private _userService: UserService) {
    }

    createHeaders() {
        const headers: Headers = new Headers();
        headers.append('content-type', 'application/json');

        if (this._userService.token() !== '' && this._userService.token().length > 1) {
            headers.append('Authorization', 'token ' + this._userService.token());
        }

        return headers;
    }

    post(url: string, data: object, additional_headers = null) {
        let headers: Headers = this.createHeaders();

        if (additional_headers) {
            headers += additional_headers;
        }

        // console.log(headers);
        // const headers: Headers = new Headers();

        this._http.post(url, { ...data }, { headers: headers })
            .subscribe(res => {
                console.log(res);
                return res;
            }, error => {
                console.log(error);
                return error;
            });
    }

    get(url, additional_headers = null) {
        let headers: Headers = this.createHeaders();
        if (additional_headers) {
            headers += additional_headers;
        }

        console.log(headers);

        this._http.get(url, { headers: headers })
            .map(res => res.json())
            .subscribe(res => {
                console.log(res);
                return res;
            }, error => {
                console.log(error);
                return error;
            });
    }
}
