export class IUser {
  public id: number;
  public firstName: string;
  public thumbnail: string;
  public city: string;
  public country: string;
  public age: number;
  public photos: Array<string>;
  public status: boolean;

  constructor() {}
}
