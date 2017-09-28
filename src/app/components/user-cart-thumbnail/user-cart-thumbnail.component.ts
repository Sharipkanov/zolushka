import {Component, OnInit, Input, ViewEncapsulation} from '@angular/core';

import {IUser} from '../../interfaces/user.interface';
import {Router} from "@angular/router";
import {PopupsService} from "../../services/popups/popups.service";
import {IDialog} from "../../interfaces/dialog.interface";
import {DialogService} from "../../services/dialog/dialog.service";
import {UserService} from "../../services/user/user.service";

@Component({
  selector: 'app-user-cart-thumbnail',
  templateUrl: './user-cart-thumbnail.component.html',
  styleUrls: ['./user-cart-thumbnail.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class UserCartThumbnailComponent implements OnInit {
  @Input() small: boolean = false;
  @Input() user: IUser = new IUser();
  @Input() classes: string = '';
  @Input() unmax: boolean = false;

  constructor(private _userService: UserService, private _router: Router, private _popupsService: PopupsService, private _dialogService: DialogService) {
  }

  ngOnInit() {
  }

  openProfile(e: Event, user: IUser) {
    e.preventDefault();

    const target = <HTMLElement>e.target;
    if (!target.closest('.js-open-chat') && !target.classList.contains('js-open-chat') && !target.classList.contains('js-start-call') && !target.closest('.js-start-call')) {
      this._router.navigate([`/profile/${(user.type === 200) ? 'she' : 'he'}/${user.id}`]);
    }
  }

  openChat(user: IUser) {
    if (this._userService.token()) {
      const dialog = new IDialog();
      dialog.clientTo = user;
      this._popupsService.openPopup('chat');
      this._dialogService.onAddNewDialog.emit(dialog);
    } else {
      this._popupsService.openPopup('regToDialog');
    }
  }
}
