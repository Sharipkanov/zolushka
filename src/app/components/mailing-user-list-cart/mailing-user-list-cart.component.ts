import {Component, Input, OnInit} from '@angular/core';
import {IUser} from '../../interfaces/user.interface';
import {PopupsService} from '../../services/popups/popups.service';

@Component({
  selector: 'app-mailing-user-list-cart',
  templateUrl: './mailing-user-list-cart.component.html',
  styleUrls: ['./mailing-user-list-cart.component.sass']
})
export class MailingUserListCartComponent implements OnInit {

  @Input() user: IUser = new IUser();

  constructor(private _popupsService: PopupsService) { }

  ngOnInit() {
  }

  openChat(user: IUser) {
    this._popupsService.openPopup('chat');
  }
}
