import { Component, OnInit } from '@angular/core';

import { UsersService } from '../../../services/users/users.service';
import { IUser } from '../../../interfaces/user.interface';

@Component({
  selector: 'app-panel-top-users',
  templateUrl: './panel-top-users.component.html',
  styleUrls: ['./panel-top-users.component.sass'],
  providers: [ UsersService ]
})
export class PanelTopUsersComponent implements OnInit {
  public users: Array<IUser> = [];

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.usersService.getTopUsers().subscribe((users: Array<IUser>) => {
      this.users = users;
    });
  }

}
