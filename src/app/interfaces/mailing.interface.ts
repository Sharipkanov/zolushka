import {ICity, ICountry} from './city.interface';
import {IUser} from './user.interface';
import {IDefaultEnum} from './enums.interface';
import {IPaginationBlacklistUsers, IPaginationUserSearch} from "./pagination.interface";
export interface IMailing {
  id: number;
  ageFrom: number;
  ageTo: number;
  country: ICountry;
  city: ICity;
  text: string;
  expiresAt: string;
  _blackList: IPaginationBlacklistUsers;
  relationshipTypes: Array<IDefaultEnum>;
  responded: boolean;
  _respondList: IPaginationUserSearch;
}
