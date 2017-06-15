import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class UserService {

  constructor(private http: Http) { }

  getPhotos($userId) {
    return this.http.get(`api.zolushka.ru/user/${$userId}/photos`).map((response: Response) => response.json());
  }

}
