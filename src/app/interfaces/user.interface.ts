import { IImages } from './images.interface';
import {ICity} from './city.interface';
export class IUser {
  id: number;
  name: string;
  avatar: IUserAvatar = <IUserAvatar>{};
  city: ICity = <ICity>{};
  lastOnline: string = null;
  age: number;
  countPhotos: number;
  aboutMe: string = null;
  online: boolean = false;
  top: boolean;

  constructor() {}
}

export class IUserAvatar {
  id: number = null;
  _links: IImages = <IImages>{};
}
