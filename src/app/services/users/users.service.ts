import {Injectable} from '@angular/core';
import {Http, RequestOptions, Response, URLSearchParams} from '@angular/http';
import {UserService} from '../user/user.service';

@Injectable()
export class UsersService {

    constructor(private _userService: UserService, private _http: Http) {
    }

    getNewUsers(count: number) {
        return this._http.get(`api.zolushka.ru/users/new/${count}`).map((response: Response) => response.json());
    }

    getTopUsers(count: number) {
        return this._http.get(`api.zolushka.ru/users/top/${count}`).map((response: Response) => response.json());
    }

    getPopularUsers() {
        return this._http.get('api.zolushka.ru/users/popular').map((response: Response) => response.json());
    }

    searchUsers(searchArray = null) {
        // const params: URLSearchParams = new URLSearchParams();
        const headers = this._userService.setHeaders({json: true});
        /*if (!!searchArray) {
            for (const key in searchArray) {
                params.set(key, searchArray[key]);
            }
        }*/

        return this._http.get('/api/api/client/search', {search: searchArray, headers: headers}).map((response: Response) => response.json());
    }

}
