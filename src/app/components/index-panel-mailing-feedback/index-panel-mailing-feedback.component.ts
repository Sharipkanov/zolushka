import {Component, Input, OnInit} from '@angular/core';
import {IPaginationUserSearch} from '../../interfaces/pagination.interface';
import {UsersService} from '../../services/users/users.service';

@Component({
  selector: 'app-index-panel-mailing-feedback',
  templateUrl: './index-panel-mailing-feedback.component.html',
  styleUrls: ['./index-panel-mailing-feedback.component.sass']
})
export class IndexPanelMailingFeedbackComponent implements OnInit {
  @Input() users: IPaginationUserSearch = new IPaginationUserSearch();
  public preloader: boolean = false;

  constructor(private _usersService: UsersService) { }

  ngOnInit() {
    if (!this.users._embedded.clientCard) {
      this.preloader = true;
      this._usersService.getNewUsers(8).subscribe((users: IPaginationUserSearch) => {
        this.users = <IPaginationUserSearch>users;
        this.preloader = false;
      });
    }
  }

}
