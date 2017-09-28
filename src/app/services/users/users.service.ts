import {Injectable} from '@angular/core';
import {Http, RequestOptions, Response, URLSearchParams} from '@angular/http';
import {UserService} from '../user/user.service';

@Injectable()
export class UsersService {

    constructor(private _userService: UserService, private _http: Http) {
    }

    getNewUsers(count: number) {
        return this._http.get(`/api/api/client/search?size=${count}&type=200`).map((response: Response) => response.json());
    }

    getTopUsers(count: number, type: number = 200) {
        return this._http.get(`/api/api/client/search?size=${count}&type=${type}`).map((response: Response) => response.json());
    }

    getPopularUsers(count: number, type: number = 200) {
        return this._http.get(`/api/api/client/search?size=${count}&type=${type}`).map((response: Response) => response.json());
    }

    searchUsers(searchArray = null) {
        const headers = this._userService.setHeaders({json: true});

        return this._http.get('/api/api/client/search', {search: searchArray, headers: headers}).map((response: Response) => response.json());
    }

}
