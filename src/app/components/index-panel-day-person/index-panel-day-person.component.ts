import {Component, Input, OnInit} from '@angular/core';
import {IPaginationUserSearch} from '../../interfaces/pagination.interface';
import {UsersService} from '../../services/users/users.service';

@Component({
  selector: 'app-index-panel-day-person',
  templateUrl: './index-panel-day-person.component.html',
  styleUrls: ['./index-panel-day-person.component.sass']
})
export class IndexPanelDayPersonComponent implements OnInit {
  @Input() users: IPaginationUserSearch = new IPaginationUserSearch();

  constructor(private _usersService: UsersService) { }

  ngOnInit() {
    this._usersService.getPopularUsers(1, 200).subscribe((users: IPaginationUserSearch) => {
      this.users = <IPaginationUserSearch>users;
    });
  }

}
