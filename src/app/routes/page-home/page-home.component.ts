import { Component, OnInit } from '@angular/core';

import { UserService } from '../../services/user/user.service';
import { UsersService } from '../../services/users/users.service';
import {IPaginationUserSearch} from '../../interfaces/pagination.interface';

@Component({
  selector: 'app-page-home',
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.sass'],
  providers: [ UsersService ]
})
export class PageHomeComponent implements OnInit {
  public logged: boolean;
  public usersInTop: IPaginationUserSearch = new IPaginationUserSearch();
  public usersNew: IPaginationUserSearch = new IPaginationUserSearch();

  constructor(private _userService: UserService, private _usersService: UsersService) { }

  ngOnInit() {

    if (this._userService.token().length > 0) {
      this.logged = true;
      this._getTopUsers(2);
      this._getNewUsers(7);
    } else {
      this.logged = false;
    }

    this._userService.onChangeToken.subscribe((token: string) => {
      if (token.length) {
        this.logged = true;
        this._getTopUsers(2);
        this._getNewUsers(7);
      } else {
        this.logged = false;
      }
    });
  }

  private _getTopUsers(count) {
    this._usersService.getTopUsers(count).subscribe((users: IPaginationUserSearch) => {
      this.usersInTop = <IPaginationUserSearch>users;
    });
  }

  private _getNewUsers(count) {
    this._usersService.getNewUsers(count).subscribe((users: IPaginationUserSearch) => {
      this.usersNew = <IPaginationUserSearch>users;
    });
  }

}
