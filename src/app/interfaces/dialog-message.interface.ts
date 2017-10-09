import {IUser} from './user.interface';
import {IDialog} from './dialog.interface';

export class IDialogMessage {
  message: string = null;
  author: IUser = new IUser();
  createdDate: string = null;
  createdTime: string = null;
  dialog: IDialog = new IDialog();
  gift: number = null;
  id: number = null;
  incoming: boolean = false;
  read: boolean = false;

  constructor(data) {
    for (const key of Object.keys(data)) {
      if (!!data[key]) {
        this[key] = data[key];
      }
    }
  }
}
