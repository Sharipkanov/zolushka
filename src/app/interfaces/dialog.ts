export class IDialog {
    id: null;
    token: null;
    lastMessage: null;
    lastMessageCreated: null;
    clientTo: {
        id: null,
        name: null,
        age: null,
        avatar: null,
        cityId: null,
        online: false,
        top: null,
        _links: {
            self: {
                href: null
            }
        }
    };
    favorite: false;
    blacklist: false;
    new: false;
    _links: {
        messages: {
            href: null
        },
        delete: {
            href: null
        },
        list: {
            href: null
        }
    };
}
