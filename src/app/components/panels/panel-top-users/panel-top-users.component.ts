import { Component, OnInit, Input } from '@angular/core';

import { UsersService } from '../../../services/users/users.service';
import { IUser } from '../../../interfaces/user.interface';

@Component({
  selector: 'app-panel-top-users',
  templateUrl: './panel-top-users.component.html',
  styleUrls: ['./panel-top-users.component.sass'],
  providers: [ UsersService ]
})
export class PanelTopUsersComponent implements OnInit {
  @Input() users: Array<IUser> = [];

  constructor(private _usersService: UsersService) { }

  ngOnInit() {
    if (!this.users.length) {
      this._usersService.getTopUsers(6).subscribe((users: Array<IUser>) => {
        this.users = users;
      });
    }
  }

}
