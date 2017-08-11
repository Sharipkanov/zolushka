import {ILink} from './link.interface';
import {IDialog} from './dialog.interface';

export interface IEmbedded {
    content: Array<any>
}

export interface IEmbeddedDialogs {
    content: Array<IDialog>
}

export class IPagination {
    page: IPaginationPage = <IPaginationPage>{};
    _links: IPaginationLinks = null;
    _embedded: IEmbedded = <IEmbedded>{};

    constructor(data = null) {
       this.setDatas(data);
    }

    setDatas(data) {
        if (!!data) {
            for (const key in data) {
                if (!!this[key]) {
                    this[key] = data[key];
                }
            }
        }
    }
}



export class IPaginationPage {
    number: number = 0;
    size: number = 10;
    totalElements: number = 0;
    totalPages: number = 0;

    constructor(data = null) {
        if (!!data) {
            for (const key in data) {
                if (!!this[key]) {
                    this[key] = data[key];
                }
            }
        }
    }
}

export class IPaginationDialogs extends IPagination {
    _embedded: IEmbeddedDialogs = <IEmbeddedDialogs>{};
    constructor(data = null) {
        super(data);
    }
}

export class IPaginationLinks {
    first: ILink = <ILink>{};
    last: ILink = <ILink>{};
    next: ILink = <ILink>{};
    self: ILink = <ILink>{};

    constructor(data = null) {
        if (!!data) {
            for (const key in data) {
                if (!!this[key]) {
                    this[key] = data[key];
                }
            }
        }
    }
}
