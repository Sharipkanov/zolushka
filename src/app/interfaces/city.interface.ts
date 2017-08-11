export class ICity {
    id: number = null;
    title: string = null;
    country: ICountry = new ICountry();
    region: IRegion = new IRegion();
}

export class ICountry {
    id: number = null;
    title: string = null;
}

export class IRegion {
    id: number = null;
    title: string = null;
    country: ICountry = new ICountry();
}
