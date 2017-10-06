import {Component, OnInit} from '@angular/core';

import {UsersService} from '../../../services/users/users.service';
import {IPaginationUserSearch} from '../../../interfaces/pagination.interface';

@Component({
  selector: 'app-section-popular-users',
  templateUrl: './section-popular-users.component.html',
  styleUrls: ['./section-popular-users.component.sass'],
  providers: [UsersService]
})
export class SectionPopularUsersComponent implements OnInit {
  public users: IPaginationUserSearch = new IPaginationUserSearch();

  constructor(private usersService: UsersService) {
  }

  ngOnInit() {
    this.usersService.getPopularUsers(12, 100).subscribe((users: IPaginationUserSearch) => {
      this.users = <IPaginationUserSearch>users;
    });
  }

}
