import { Injectable, Inject, Output, EventEmitter } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { StorageService } from '../storage/storage.service';
import { ILogin } from '../../interfaces/login.interface';

@Injectable()
export class UserService {

    onChangeToken: EventEmitter<String> = new EventEmitter<String>();

    constructor(private _http: Http, @Inject(StorageService) private _storageService: StorageService) {
    }

    token() {
        if (this._storageService.get('token') === null) {
            return '';
        } else {
            return this._storageService.get('token');
        }
    }

    setToken(token: string) {
        this._storageService.set('token', token);

        return this.onChangeToken.emit(this.token());
    }

    login(data: ILogin) {
        const headers: Headers = new Headers();

        headers.append('Authorization', 'Basic ' + btoa(data.email + ':' + data.password));
        headers.append('Content-Type', 'application/json');
        return this._http.post(`/api/auth/token`, { ...data}, { headers: headers }).map((response: Response) => response.json());
    }

    logout() {
        this._storageService.remove('token');

        return this.onChangeToken.emit('');
    }

    register() {

    }

    info() {

    }

    getPhotos($userId) {
        return this._http.get(`api.zolushka.ru/user/${$userId}/photos`).map((response: Response) => response.json());
    }

}
