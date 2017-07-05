import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  public expanded: boolean;
  public logged: boolean;
  private _isHomepage: boolean;

  constructor(private _router: Router, private _userService: UserService) {
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
      }
    });
  }

  ngOnInit() {
    if (this._userService.token().length) {
      this.logged = true;
      this.expanded = false;
    } else {
      this.logged = false;

      (this._isHomepage) ? this.expanded = true : this.expanded = false;
    }

    this._userService.login({
      email: 'sharipkanov@gmail.com',
      password: 'googlethebest'
    }).subscribe(response => {
      this._userService.setToken(response.token);
    });

    // TODO remove logout
    /*setTimeout(() => {
      this._userService.logout();
    }, 1);*/

    this._userService.onChangeToken.subscribe((token: string) => {
      if (token.length) {
        this.logged = true;
        this.expanded = false;
      } else {
        this.logged = false;

        (this._isHomepage) ? this.expanded = true : this.expanded = false;
      }
    });
  }
}
