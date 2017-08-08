import { EventEmitter, Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import {UserService} from '../user/user.service';

@Injectable()
export class DialogService {

    public onAddNewDialog: EventEmitter<any> = new EventEmitter();

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
        return this._http.get('/api/api/dialogs', {headers: this._userService.setHeaders({json: true})})
            .map((response: Response) => response.json());
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
