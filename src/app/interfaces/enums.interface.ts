export class IEnums {
  appearance: Array<IDefaultEnum> = [];
  breastSize: Array<IDefaultEnum> = [];
  eyeColor: Array<IEnumEye> = [];
  hairColor: Array<IEnumHairColor> = [];
  higherEducation: Array<IDefaultEnum> = [];
  hobbies: Array<IDefaultEnum> = [];
  physique: Array<IEnumPhysique> = [];
  registrationCityType: Array<IDefaultEnum> = [];
  relationshipState: Array<IDefaultEnum> = [];
  relationshipTypes: Array<IDefaultEnum> = [];
  childrenExist: Array<IDefaultEnum> = [];
  sexualKinds: Array<IDefaultEnum> = [];
  sexualPeriodicity: Array<IDefaultEnum> = [];
  sexualPreference: Array<IDefaultEnum> = [];
  sexualRole: Array<IDefaultEnum> = [];
  zodiacsign: Array<IDefaultEnum> = [];
  type: Array<IEnumType>;
  datePicker: object = {
    day: [],
    month: [],
    year: [],
  };
}

export interface IDefaultEnum {
  id: number;
  title: string;
  selectorId: number;
  selectorTitle: string;
}

export interface IEnumDefaultColored {
  color: string;
}

export interface IEnumDefaultGenderedTitles {
  maleTitle: string;
  femaleTitle: string;
}

export interface IEnumPhysique extends IDefaultEnum, IEnumDefaultGenderedTitles {
}

export interface IEnumHairColor extends IDefaultEnum, IEnumDefaultColored {
}

export interface IEnumEye extends IDefaultEnum, IEnumDefaultColored {
}

export interface IEnumType extends IDefaultEnum, IEnumDefaultGenderedTitles {
}
