import { IUserAvatar } from './user.interface';
export class IUserInfo {
    avatar: IUserAvatar = <IUserAvatar>{};
    balanceAmount: number = 0;
    contactsAmount: number = 0;
    minutesAmount: number = 0;
    clientState: string = 'activated';
    id: number = null;
    premium: boolean = false;
    sortPosition: number = 10001;
}
