import { Component, OnInit } from '@angular/core';

import { UsersService } from '../../../services/users/users.service';
import { IUser } from  '../../../interfaces/user.interface';

@Component({
  selector: 'app-section-popular-users',
  templateUrl: './section-popular-users.component.html',
  styleUrls: ['./section-popular-users.component.sass'],
  providers: [ UsersService ]
})
export class SectionPopularUsersComponent implements OnInit {
  public users: Array<IUser> = [];

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.usersService.getPopularUsers().subscribe((users: Array<IUser>) => {
      this.users = users;
    });
  }

}
