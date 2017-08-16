import {ILink} from './link.interface';
import {IDialog} from './dialog.interface';
import {IUser} from "./user.interface";

export interface IEmbedded {
    content: Array<any>
}

export interface IEmbeddedDialogs extends IEmbedded {
    content: Array<IDialog>
}

export interface IEmbeddedUserSearch extends IEmbedded {
    clientCard: Array<IUser>;
}

export class IPagination {
    page: IPaginationPage = <IPaginationPage>{};
    _links: IPaginationLinks = null;
    _embedded: IEmbedded = <IEmbedded>{};

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

export class IPaginationUserSearch extends IPagination {
    _embedded: IEmbeddedUserSearch = <IEmbeddedUserSearch>{};

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

export class IPaginationComponent extends IPagination {
    _allowPrev: boolean = false;
    _allowNext: boolean = false;
    _pages: Array<IPaginationPages> = [];

    constructor(data = null) {
        super(data);
    }
}

export class IPaginationPages {
    title: string = '';
    id: number = null;
}
