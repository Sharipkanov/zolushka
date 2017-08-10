import { IUser } from './user.interface';
import { ILink } from './link.interface';
export class IDialog {
    id: number = null;
    token: string = null;
    lastMessage: string = null;
    lastMessageCreated: string = null;
    clientTo: IUser = new IUser();
    favorite: boolean = false;
    blacklist: boolean = false;
    new: boolean = false;
    _links: IDialogLinks = new IDialogLinks();
}

export class IDialogLinks {
    messages: ILink = new ILink();
    delete: ILink = new ILink();
    list: ILink = new ILink();
}