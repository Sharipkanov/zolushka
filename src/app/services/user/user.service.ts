///<reference path="../../../../node_modules/rxjs/add/operator/map.d.ts"/>
import { Injectable, Inject, Output, EventEmitter } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { StorageService } from '../storage/storage.service';
import { ILogin } from '../../interfaces/login.interface';
import { Observable } from "rxjs";

@Injectable()
export class UserService {

    onChangeToken: EventEmitter<String> = new EventEmitter<String>();
    onChangeUserInfo: EventEmitter<Object> = new EventEmitter<Object>();

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
        return this._http
            .post(`/api/auth/token`, { ...data }, { headers: headers })
            .map(response => response.json())
            .catch((error) => {
                // console.error(error.status);
                return error;

                // The following doesn't work.
                // There's no error status at least in case of network errors.
                // WHY?!
                //
                // if ( error === undefined) error = null;
                // let errMsg = (error && error.message)
                //     ? error.message
                //     : (error && error.status)
                //         ? `${error.status} - ${error.statusText}`
                //         : error;
                //
                // return Observable.throw(errMsg);
            });
    }

    logout() {
        this._storageService.remove('token');
        this._storageService.remove('user_info');

        return this.onChangeToken.emit('');
    }

    register(data: object) {

    }

    info() {
        // this._storageService.remove('user_info');
        if (this._storageService.get('user_info')) {
            return JSON.parse(this._storageService.get('user_info'));
        } else {
            return this.info_update();
        }
    }

    info_update(): Promise<any> {
        // let user_info: object = {};
        return new Promise((resolve, reject) => {
            const headers: Headers = new Headers();
            headers.append('Authorization', 'token ' + this._storageService.get('token'));
            headers.append('content-type', 'application/json');

            this._http.get(`/api/api/client/base-info`, new RequestOptions({ headers: headers }))
                .toPromise()
                .then(response => {
                    response = response.json();

                    this._storageService.set('user_info', response);

                    this.onChangeUserInfo.emit(response);
                    resolve(response);
                })
                .catch();
        });
    }

    getPhotos($userId) {
        return this._http.get(`api.zolushka.ru/user/${$userId}/photos`).map((response: Response) => response.json());
    }

}
