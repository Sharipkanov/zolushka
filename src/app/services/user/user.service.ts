import {Injectable, Inject, Output, EventEmitter} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';

import {StorageService} from '../storage/storage.service';
import {ILogin} from '../../interfaces/login.interface';
import {CanActivate, Router} from '@angular/router';

@Injectable()
export class UserService implements CanActivate {

  onChangeToken: EventEmitter<String> = new EventEmitter<String>();
  onChangeUserInfo: EventEmitter<Object> = new EventEmitter<Object>();

  constructor(private _router: Router, private _http: Http, @Inject(StorageService) private _storageService: StorageService) {
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

  removeToken() {
    this.onChangeToken.emit('');
    this._storageService.remove('token');
    this._storageService.remove('user_info');
    this._router.navigate(['/']);
  }

  login(data: ILogin) {
    this._storageService.remove('user_info');
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
    this._storageService.remove('user_info');
    this.removeToken();
  }

  register(data) {
    const headers = this.setHeaders({json: true});

    return this._http.post('/api/auth/signup', data, {headers: headers});
  }

  info(data = null) {
    let user_info;
    // this._storageService.remove('user_info');
    if (!!data) {
      this._storageService.set('user_info', data);
      user_info = data;
      this.onChangeUserInfo.emit(data);
    } else {
      if (this._storageService.get('user_info')) {
        user_info = JSON.parse(this._storageService.get('user_info'));
      } else {
        this.infoUpdate().subscribe(response => {
          this._storageService.set('user_info', response);
          user_info = response;
          this.onChangeUserInfo.emit(response);
        });
      }
    }

    return user_info;
  }

  infoUpdate() {
    const headers = this.setHeaders();
    return this._http.get(`/api/api/client/base-info`, {headers: headers})
      .map(res => res.json());
  }

  profilePageInfo(profile_id = null) {
    const headers = this.setHeaders();
    let url = `/api/api/client/`;
    if (profile_id) {
      url += `profile/${profile_id}`;
    }
    return this._http.get(url, {headers: headers})
      .map(res => res.json());
  }

  profileUpdate(model) {
    const headers = this.setHeaders({json: true});

    console.log(model);

    return this._http.post('/api/api/client/', model, {headers: headers})
      .map(res => res.json());
  }

  uploadPhoto(input, size: number = null) {
    const fileList: FileList = input.files;
    let url = `/api/media/client/images`;

    if (size) {
      url += `?size=${size}`;
    }
    if (fileList.length > 0) {
      const files: FileList = fileList;
      const formDataValue: FormData = new FormData();

      for (let i = 0; i < files.length; i++) {
        formDataValue.append('files', files[i], files[i].name);
      }
      const headers = this.setHeaders();
      return this._http.post(url, formDataValue, {headers: headers})
        .map((response: Response) => response.json());
    }
  }

  getPhotos(link: string = null, profile_id = null) {
    const headers = this.setHeaders();
    let query = `/api/media/client/images`;

    if (!!profile_id) {
      query = `/api/media/client/profile/${profile_id}/images`;
    }

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

  setAvatar(id: number) {
    const headers = this.setHeaders({json: true});

    return this._http.get(`/api/api/client/set-avatar/${id}`, {headers: headers})
      .map((response: Response) => response.json());
  }

  confirmPhoto() {
    console.log('confirm');
  }

  setHeaders(type: object = null) {
    const headers: Headers = new Headers();
    if (!!type && type['json']) {
      headers.append('Content-Type', 'application/json');
    }

    if (!!this.token().length) {
      headers.append('Authorization', 'token ' + this.token());

    }

    return headers;
  }

  canActivate() {
    if (!this.token().length) {
      this._router.navigate(['/']);
      return false;
    }
    return true;
  }
}
