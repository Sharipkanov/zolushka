import {IUserAvatar} from './user.interface';
import {IDefaultEnum, IEnumEye, IEnumHairColor, IEnumPhysique, IEnumType} from './enums.interface';
import {ICity} from './city.interface';
export class IProfile {
  aboutMe: string = '';
  // appearance:
  avatar: IUserAvatar = <IUserAvatar>{};
  birthdate: string = '';
  breastSize: IDefaultEnum = <IDefaultEnum>{};
  childrenExist: IDefaultEnum = <IDefaultEnum>{};
  city: ICity = <ICity>{};
  eyeColor: IEnumEye = <IEnumEye>{};
  hairColor: IEnumHairColor = <IEnumHairColor>{};
  height: number = null;
  higherEducation: IDefaultEnum = <IDefaultEnum>{};
  hobbies: Array<IDefaultEnum> = [];
  id: number = null;
  name: string = null;
  online: boolean = false;
  phone: string = null;
  physique: IEnumPhysique = <IEnumPhysique>{};
  relationshipState: IDefaultEnum = <IDefaultEnum>{};
  relationshipTypes: Array<IDefaultEnum> = [];
  sexualKinds: Array<IDefaultEnum> = [];
  sexualPeriodicity: IDefaultEnum = <IDefaultEnum>{};
  sexualPreference: IDefaultEnum = <IDefaultEnum>{};
  sexualRole: IDefaultEnum = <IDefaultEnum>{};
  type: IEnumType = <IEnumType>{};
  weight: string = null;
  zodiacSign: string = null;
  _bodyCondition: Array<string> = [];
  _sexualSection: Array<string> = [];
}
