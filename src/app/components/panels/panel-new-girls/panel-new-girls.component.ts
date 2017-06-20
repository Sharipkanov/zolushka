import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

import { IUser } from '../../../interfaces/user.interface';
import { UsersService } from '../../../services/users/users.service';

@Component({
  selector: 'app-panel-new-girls',
  templateUrl: './panel-new-girls.component.html',
  styleUrls: ['./panel-new-girls.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class PanelNewGirlsComponent implements OnInit {
  @Input() users: Array<IUser> = [];

  constructor(private _usersService: UsersService) { }

  ngOnInit() {
    if (!this.users.length) {
      this._usersService.getNewUsers(7).subscribe((users: Array<IUser>) => {
        this.users = users;

        console.log(users);
      });
    }
  }

}
