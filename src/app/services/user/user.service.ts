///<reference path="../../../../node_modules/rxjs/add/operator/map.d.ts"/>
import { Injectable, Inject, Output, EventEmitter } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { StorageService } from '../storage/storage.service';
import { ILogin } from '../../interfaces/login.interface';
import { HttpService } from '../http/http.service';

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
        const login = this._http
            .post(`/api/auth/token`, { ...data }, { headers: headers });


        login.subscribe((response) => {
            if (!!response.json().accessToken) {
                this.setToken(response.json().accessToken);
                return true;
            }
            return false;
        }, error => {
            console.log(error);
            return error;
        });

        return login.map(response => response.json());
    }

    logout() {
        this._storageService.remove('token');
        this._storageService.remove('user_info');

        return this.onChangeToken.emit('');
    }

    register(data) {
        const headers: Headers = new Headers();

        headers.append('Content-Type', 'application/json');

        return this._http.post('/api/auth/signup', { ...data }, { headers: headers });
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
            const headers = this.setHeaders();

            this._http.get(`/api/api/client/base-info`, { headers: headers })
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

    profilePageInfo() {
        const headers = this.setHeaders();

        return this._http.get(`/api/api/client/${this.info().id}`, { headers: headers })
            .map(res => res.json());
    }

    profileUpdate(model): Promise<any> {
        return new Promise((resolve, reject) => {
            const headers = this.setHeaders();

            this._http.post('/api/api/client', model, { headers: headers })
                .toPromise()
                .then(response => {
                    response = response.json();

                    resolve(response);
                });
        });
    }

    getPhotos($userId) {
        return this._http.get(`api.zolushka.ru/user/${$userId}/photos`).map((response: Response) => response.json());
    }


    setHeaders() {
        const headers: Headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'token ' + this._storageService.get('token'));

        return headers;
    }
}
