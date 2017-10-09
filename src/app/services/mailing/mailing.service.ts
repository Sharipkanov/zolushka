import {EventEmitter, Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {UserService} from '../user/user.service';
import {IMailing} from '../../interfaces/mailing.interface';
import {IPaginationBlacklistUsers} from '../../interfaces/pagination.interface';

@Injectable()
export class MailingService {

  public onBlacklistEdit: EventEmitter<IPaginationBlacklistUsers> = new EventEmitter();
  public onCreateMailing: EventEmitter<IMailing> = new EventEmitter();

  constructor(private _http: Http, private _userService: UserService) {
  }

  createMailing(data: IMailing, serviceId: number) {
    const headers = this._userService.setHeaders({json: true});

    return this._http.post(`/api/api/client/mailing/service/${serviceId}`, data, {headers: headers}).map((response: Response) => response.json());
  }

  editMailing(data: IMailing, id: number) {
    const headers = this._userService.setHeaders({json: true});

    return this._http.post(`/api/api/client/mailing/${id}`, data, {headers: headers}).map((response: Response) => response.json());
  }

  stopMailing(id: number) {
    const headers = this._userService.setHeaders({json: true});

    return this._http.get(`/api/api/client/mailing/${id}/stop`, {headers: headers}).map((response: Response) => response.json());
  }

  addMailingFeedback(id: number) {
    const headers = this._userService.setHeaders({json: true});

    // TODO узнать какой ментод и поправить если будет необходимость
    return this._http.get(`/api/api/client/mailing/${id}/responded`, {headers: headers}).map((response: Response) => response.json());
  }

  getActiveMailing(id: number = null) {
    const headers = this._userService.setHeaders({json: true});
    let url = `/api/api/client/mailing`;

    if (id) {
      url += `/${id}`;
    }

    return this._http.get(url, {headers: headers}).map((response: Response) => response.json())
  }

  getActiveMailingList() {
    const headers = this._userService.setHeaders({json: true});

    return this._http.get(`/api/api/client/mailing/list`, {headers: headers}).map((response: Response) => response.json());
  }

  getMailingArchive() {
    const headers = this._userService.setHeaders({json: true});

    return this._http.get(`/api/api/client/mailing/list/archive`, {headers: headers}).map((response: Response) => response.json());
  }

  getMailingRespondList(id: number = null) {
    const headers = this._userService.setHeaders({json: true});

    let url = `/api/api/client/mailing/responsed`;

    if (id) {
      url = `/api/api/client/mailing/${id}/responsed`;
    }

    return this._http.get(url, {headers: headers}).map((response: Response) => response.json());
  }

  getMailingBlacklist(id: number) {
    const headers = this._userService.setHeaders({json: true});

    return this._http.get(`/api/api/client/mailing/${id}/blacklist`, {headers: headers}).map((response: Response) => response.json());
  }

  getMailingDialogs() {
    const headers = this._userService.setHeaders({json: true});

    return this._http.get(`/api/api/client/mailing/dialog-clients`, {headers: headers}).map((response: Response) => response.json());
  }
}
