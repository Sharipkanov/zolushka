import { EventEmitter, Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { UserService } from '../user/user.service';
import { IDialogMessage } from '../../interfaces/dialog-message.interface';
import { Socket } from 'ngx-socket-io';
import { IDialogFolder } from '../../interfaces/dialog-folder.interface';
import { IDialog } from '../../interfaces/dialog.interface';

@Injectable()
export class DialogService {

    public onAddNewDialog: EventEmitter<any> = new EventEmitter();

    constructor(private _http: Http, private _userService: UserService) {
    }

    getFolders() {
        return this._http.get(`/api/api/folders`, { headers: this._userService.setHeaders({ json: true }) })
            .map((response: Response) => response.json());
    }

    addFolder(data) {
        return this._http.post(`/api/api/folders`, data, { headers: this._userService.setHeaders({ json: true }) })
            .map((response: Response) => response.json());
    }

    deleteFolder(folder: IDialogFolder) {
        return this._http.get(`/api/api/folders/${folder.id}/delete`, { headers: this._userService.setHeaders({ json: true }) })
            .map((response: Response) => response.json());
    }

    getDialogs(filterParams = {}) {
        let url = `/api/api/dialogs`;
        if (!!filterParams) {
            const out = [];
            for (const key in filterParams) {
                out.push(`${key}=${filterParams[key]}`);
            }
            url += '?' + out.join('&');
        }
        return this._http.get(url, { headers: this._userService.setHeaders({ json: true }) })
            .map((response: Response) => response.json());
    }

    addDialog(data: IDialogMessage, userId: number) {
        return this._http.post(`/api/api/dialogs/create-to/${userId}`, data, { headers: this._userService.setHeaders({ json: true }) })
            .map((response: Response) => response.json());
    }

    deleteDialog(token: string) {
        return this._http.get(`/api/api/dialogs/${token}/delete`, { headers: this._userService.setHeaders({ json: true }) })
            .map((response: Response) => response.json());
    }

    favoriteDialog(token: string) {
        return this._http.get(`/api/api/dialogs/${token}/favorite`, { headers: this._userService.setHeaders({ json: true }) })
            .map((response: Response) => response.json());
    }

    blacklistDialog(token: string) {
        return this._http.get(`/api/api/dialogs/${token}/blacklist`, { headers: this._userService.setHeaders({ json: true }) })
            .map((response: Response) => response.json());
    }

    moveDialog() {

    }

    getMessagesList(token: string) {
        return this._http.get(`/api/api/dialogs/${token}/messages`, { headers: this._userService.setHeaders({ json: true }) })
            .map((response: Response) => response.json());
    }

    addMessage(message: IDialogMessage, dialog: IDialog) {
        return this._http.post(`/api/api/dialogs/${dialog.token}/messages`, message, { headers: this._userService.setHeaders({ json: true }) })
            .map((response: Response) => response.json());
        // this.socket.emit('add-message', message);
    }

    messages() {

    }
}
