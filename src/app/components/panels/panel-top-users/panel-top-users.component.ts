import {Component, OnInit, Input} from '@angular/core';

import {UsersService} from '../../../services/users/users.service';
import {IPaginationUserSearch} from '../../../interfaces/pagination.interface';

@Component({
  selector: 'app-panel-top-users',
  templateUrl: './panel-top-users.component.html',
  styleUrls: ['./panel-top-users.component.sass'],
  providers: [UsersService]
})
export class PanelTopUsersComponent implements OnInit {
  @Input() users: IPaginationUserSearch = new IPaginationUserSearch();

  public preloader: boolean = true;
  public currentGender = 200;

  constructor(private _usersService: UsersService) {
  }

  ngOnInit() {
    if (!this.users._embedded.clientCard) {
      this.preloader = true;
      this._usersService.getTopUsers(5).subscribe((users: IPaginationUserSearch) => {
        this.users = <IPaginationUserSearch>users;
        this.preloader = false;
      });
    } else {
      this.preloader = false;
    }
  }

  changeGender(e: Event) {
    this.preloader = true;
    if (this.currentGender === 200) {
      this.currentGender = 100;
    } else {
      this.currentGender = 200;
    }
    this._usersService.getTopUsers(5, this.currentGender).subscribe((users: IPaginationUserSearch) => {
      this.users = <IPaginationUserSearch>users;
      this.preloader = false;
    });
  }
}
