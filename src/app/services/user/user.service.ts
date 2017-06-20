import { Injectable, Inject, Output, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';

import { StorageService } from '../storage/storage.service';
import { ILogin } from '../../interfaces/login.interface';

@Injectable()
export class UserService {

  onChangeToken: EventEmitter<String> = new EventEmitter<String>();

  constructor(private _http: Http, @Inject(StorageService) private _storageService: StorageService) { }

  token() {
    return this._storageService.get('token');
  }

  setToken(token: string) {
    this._storageService.set('token', token);

    return this.onChangeToken.emit(this.token());
  }

  login(data: ILogin) {
    return this._http.post(`api.zolushka.ru/user/authenticate`, {...data}).map((response: Response) => response.json());
  }

  logout() {
    this._storageService.remove('token');

    return this.onChangeToken.emit(null);
  }

  register() {

  }

  info() {

  }

  getPhotos($userId) {
    return this._http.get(`api.zolushka.ru/user/${$userId}/photos`).map((response: Response) => response.json());
  }

}
