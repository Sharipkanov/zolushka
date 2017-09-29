import {Component, OnInit} from '@angular/core';
import {UsersService} from '../../services/users/users.service';
import {IPaginationUserSearch} from '../../interfaces/pagination.interface';

@Component({
  selector: 'app-bottom-grid',
  templateUrl: './bottom-grid.component.html',
  styleUrls: ['./bottom-grid.component.sass']
})
export class BottomGridComponent implements OnInit {

  public users: IPaginationUserSearch = new IPaginationUserSearch();

  constructor(private _usersService: UsersService) {
  }

  ngOnInit() {
    this._usersService.getBottomGridUsers(8).subscribe((users: IPaginationUserSearch) => {
      this.users = <IPaginationUserSearch>users;
    });
  }

}
