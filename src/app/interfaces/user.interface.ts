export class IUser {
  public id: number;
  public name: string;
  public avatar: object = {
    thumb: null
  };
  public city: {
    title: null,
    country: {
      title: null
    }
  };
  public age: number;
  public countPhotos: Array<string>;
  public excerpt: string = null;
  public online: boolean = false;
  public top: boolean;

  constructor() {}
}
