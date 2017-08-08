import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {UserService} from '../user/user.service';

@Injectable()
export class DialogService {

    constructor(private _http: Http, private _userService: UserService) {
    }

    getFolders() {
        return this._http.get('/api/api/folders', {headers: this._userService.setHeaders({json: true})})
            .map((response: Response) => response.json());
    }

    addFolder(data) {
        return this._http.post('/api/api/folders', data, {headers: this._userService.setHeaders({json: true})})
            .map((response: Response) => response.json());
    }

    deleteFolder() {

    }

    getDialogs() {

    }

    addDialog() {

    }

    deleteDialog() {

    }

    moveDialog() {

    }

    messagesList() {

    }

    messages() {

    }
}
