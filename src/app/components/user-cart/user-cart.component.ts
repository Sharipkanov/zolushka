import { Component, OnInit, Input } from '@angular/core';

import { IUser} from '../../interfaces/user.interface';
import { PopupsService } from "../../services/popups/popups.service";
import { DialogService } from "../../services/dialog/dialog.service";
import { IDialog } from "../../interfaces/dialog";

@Component({
  selector: 'app-user-cart',
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.sass']
})
export class UserCartComponent implements OnInit {
  @Input() user: IUser;
  @Input() small: boolean = false;

  constructor(private _dialogService: DialogService) { }

  ngOnInit() {
  }

  openChat(user) {
    const dialog = new IDialog();
    dialog.clientTo = user;
    this._dialogService.onAddNewDialog.emit(dialog);
  }
}
