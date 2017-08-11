import {IUser} from './user.interface';
import {ILink} from './link.interface';

export class IDialog {
    id: number = null;
    token: string = null;
    lastMessage: string = null;
    lastMessageCreated: string = null;
    clientTo: IUser = new IUser();
    favorite: boolean = false;
    blacklist: boolean = false;
    new: boolean = false;
    _activeKey: boolean = null;
    _links: IDialogLinks = new IDialogLinks();

    constructor(dialog = null) {
        if (!!dialog) {
            for (const key in dialog) {
                if (this[key] !== undefined) {
                    this[key] = dialog[key];
                }
            }
        }
    }
}

export class IDialogLinks {
    messages: ILink = new ILink();
    delete: ILink = new ILink();
    list: ILink = new ILink();
}
