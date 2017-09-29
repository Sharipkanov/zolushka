import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

import { IUser } from '../../../interfaces/user.interface';
import { UsersService } from '../../../services/users/users.service';
import {IPaginationUserSearch} from "../../../interfaces/pagination.interface";

@Component({
  selector: 'app-panel-new-girls',
  templateUrl: './panel-new-girls.component.html',
  styleUrls: ['./panel-new-girls.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class PanelNewGirlsComponent implements OnInit {
  @Input() users: IPaginationUserSearch = new IPaginationUserSearch();

  constructor(private _usersService: UsersService) { }

  ngOnInit() {
    if (!this.users._embedded.clientCard) {
      this._usersService.getNewUsers(7).subscribe((users: IPaginationUserSearch) => {
        this.users = <IPaginationUserSearch>users;
        console.log(users);
      });
    }
  }
}
