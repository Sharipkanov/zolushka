import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class UsersService {

  constructor(private http: Http) { }

  getNewUsers() {
    return this.http.get('api.zolushka.ru/users/new').map((response: Response) => response.json());
  }

  getTopUsers() {
    return this.http.get('api.zolushka.ru/users/top').map((response: Response) => response.json());
  }

}
