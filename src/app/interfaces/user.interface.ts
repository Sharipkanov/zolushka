import { IImages } from './images.interface';
export class IUser {
  id: number;
  name: string;
  avatar: object = {
    thumb: null
  };
  city: {
    title: null,
    country: {
      title: null
    }
  };
  age: number;
  countPhotos: Array<string>;
  excerpt: string = null;
  online: boolean = false;
  top: boolean;

  constructor() {}
}

export class IUserAvatar {
  id: number = null;
  _links: IImages = new IImages();
}
