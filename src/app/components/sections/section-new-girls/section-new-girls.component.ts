import {Component, OnInit, Input} from '@angular/core';

import {UsersService} from '../../../services/users/users.service';
import {IPaginationUserSearch} from '../../../interfaces/pagination.interface';

@Component({
  selector: 'app-section-new-girls',
  templateUrl: './section-new-girls.component.html',
  styleUrls: ['./section-new-girls.component.sass'],
  providers: [UsersService]
})
export class SectionNewGirlsComponent implements OnInit {
  @Input() users: IPaginationUserSearch = new IPaginationUserSearch();

  constructor(private usersService: UsersService) {
  }

  ngOnInit() {
    if (!this.users._embedded.clientCard) {
      this.usersService.getNewUsers(5).subscribe((users: IPaginationUserSearch) => {
        this.users = <IPaginationUserSearch>users;
      });
    }
  }

}
