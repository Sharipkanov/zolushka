import { Component, OnInit, Input } from '@angular/core';

import { UsersService } from '../../../services/users/users.service';
import { IUser} from '../../../interfaces/user.interface';

@Component({
  selector: 'app-section-new-girls',
  templateUrl: './section-new-girls.component.html',
  styleUrls: ['./section-new-girls.component.sass'],
  providers: [ UsersService ]
})
export class SectionNewGirlsComponent implements OnInit {
  @Input() users: Array<IUser> = [];
  constructor(private usersService: UsersService) { }

  ngOnInit() {
    if (!this.users.length) {
      this.usersService.getNewUsers(5).subscribe((users: Array<IUser>) => {
        this.users = users;
      });
    }
  }

}
