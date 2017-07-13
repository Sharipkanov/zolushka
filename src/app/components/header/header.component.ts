import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

import { UserService } from '../../services/user/user.service';
import { StorageService } from "../../services/storage/storage.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  public expanded: boolean;
  public logged: boolean;
  private _isHomepage: boolean;
  public user_info: object = {};

  constructor(private _router: Router, private _userService: UserService, private _storageService: StorageService) {
    this._router.events.subscribe(e => {
      if (e instanceof NavigationStart) {
        const url = e.url;

        if (url === '/') {
          this.expanded = true;
          this._isHomepage = true;
        } else {
          this.expanded = false;
          this._isHomepage = false;
        }

        const userToken: string = this._userService.token();
        if (userToken.length > 0 && userToken !== 'undefined') {
          this.logged = true;
          this.expanded = false;
          this.getProfileData();
        } else {
          this.logged = false;

          (this._isHomepage) ? this.expanded = true : this.expanded = false;
        }
      }
    });
  }

  getProfileData() {
    // this._storageService.remove('user_info');
    this.user_info = this._userService.info();
  }

  ngOnInit() {
    this._userService.onChangeToken.subscribe((token: string) => {
      if (token.length > 0 && token !== 'undefined') {
        this.logged = true;
        this.expanded = false;
        this.getProfileData();
      } else {
        this.logged = false;

        (this._isHomepage) ? this.expanded = true : this.expanded = false;
      }
    });

    this._userService.onChangeUserInfo.subscribe((user_info: object) => {
      this.user_info = user_info;
    });
  }

  // TODO remove this method and make login popup
  login() {
    this._userService.login({
      email: 'test12@test.ru',
      password: '123456'
    }).subscribe(response => {
      console.log(response);
      this._userService.setToken(response.accessToken);
    });
  }
}
