import {ICity, ICountry} from './city.interface';
import {IUser} from './user.interface';
import {IDefaultEnum} from './enums.interface';
export interface IMailing {
  id: number;
  ageFrom: number;
  ageTo: number;
  country: ICountry;
  city: ICity;
  text: string;
  expiresAt: string;
  blackList: Array<IUser>;
  relationshipTypes: Array<IDefaultEnum>;
  responded: boolean;
  respondList: Array<IUser>;
}
