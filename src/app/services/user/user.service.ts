import {Injectable, Inject, Output, EventEmitter} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';

import {StorageService} from '../storage/storage.service';
import {ILogin} from '../../interfaces/login.interface';
import {HttpService} from '../http/http.service';
import {Observable} from "rxjs/Observable";

@Injectable()
export class UserService {

    onChangeToken: EventEmitter<String> = new EventEmitter<String>();
    onChangeUserInfo: EventEmitter<Object> = new EventEmitter<Object>();

    public user = {};

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
            .post(`/api/auth/token`, {...data}, {headers: headers});


        login.subscribe((response) => {
            if (!!response.json().accessToken) {
                this.setToken(response.json().accessToken);
                this.info();
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

        return this._http.post('/api/auth/signup', {...data}, {headers: headers});
    }

    info() {
        let user_info;
        // this._storageService.remove('user_info');
        if (this._storageService.get('user_info')) {
            user_info = JSON.parse(this._storageService.get('user_info'));
        } else {
            this.infoUpdate().subscribe(response => {
                this._storageService.set('user_info', response);
                user_info = response;
                this.onChangeUserInfo.emit(response);
            });
        }

        return user_info;
    }

    infoUpdate() {
        const headers = this.setHeaders();
        return this._http.get(`/api/api/client/base-info`, {headers: headers})
            .map(res => res.json());
    }

    profilePageInfo() {
        const headers = this.setHeaders();
        return this._http.get(`/api/api/client/`, {headers: headers})
            .map(res => res.json());
    }

    profileUpdate(model) {
        const headers = this.setHeaders({json: true});

        console.log(model);

        return this._http.post('/api/api/client/', model, {headers: headers})
            .map(res => res.json());
    }

    uploadPhoto(input) {
        const fileList: FileList = input.files;
        if (fileList.length > 0) {
            const files: FileList = fileList;
            const formDataValue: FormData = new FormData();

            for (let i = 0; i < files.length; i++) {
                formDataValue.append('files', files[i], files[i].name);
            }
            const headers = this.setHeaders();
            return this._http.post(`/api/media/client/images`, formDataValue, {headers: headers})
                .map((response: Response) => response.json());
        }
    }

    getPhotos(link: string = null) {
        const headers = this.setHeaders();
        let query = `/api/media/client/images`;

        if (link && link !== undefined) {
            query += '/' + link;
        }

        return this._http.get(query, {headers: headers})
            .map((response: Response) => response.json());
    }

    removePhoto(id: number) {
        const headers = this.setHeaders();

        return this._http.get(`/api/media/client/image/${id}/delete`, {headers: headers})
            .map((response: Response) => response.json());
    }

    setHeaders(type: object = null) {
        const headers: Headers = new Headers();
        if (!!type && type['json']) {
            headers.append('Content-Type', 'application/json');
        }

        headers.append('Authorization', 'token ' + this._storageService.get('token'));

        return headers;
    }
}
