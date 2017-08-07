import { Component, OnInit } from '@angular/core';

import { UsersService } from '../../services/users/users.service';
import { IUser } from '../../interfaces/user.interface';

@Component({
  selector: 'app-page-search',
  templateUrl: './page-search.component.html',
  styleUrls: ['./page-search.component.sass'],
  providers: [ UsersService ]
})
export class PageSearchComponent implements OnInit {
  public users: Array<IUser> = [];

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.usersService.searchUsers().subscribe((users) => {
      console.log(users._embedded.clientCard);
      this.users = users._embedded.clientCard;
    });
  }

}
