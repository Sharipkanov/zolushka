import {Component, HostListener, OnInit, ViewEncapsulation} from '@angular/core';
import {UserService} from '../../../services/user/user.service';
import {PopupsService} from '../../../services/popups/popups.service';

@Component({
    selector: 'app-popups',
    templateUrl: './popups.component.html',
    styleUrls: ['./popups.component.sass'],
    encapsulation: ViewEncapsulation.None
})
export class PopupsComponent implements OnInit {

    public popups: object = {
        login: {
            active: false,
            visible: false
        },
        chat: {
            active: false,
            visible: false
        },
        buyConfirmedPhotos: {
            active: true,
            visible: false
        }
    };

    constructor(private _userService: UserService, private _popupsService: PopupsService) {
    }

    ngOnInit() {
        this.detectActivePopups();

        this._userService.onChangeToken.subscribe(() => {
            this.detectActivePopups();
        });

        this._userService.onChangeToken.subscribe((token: string) => {
            if (!token.length) {
                // ACTIVATE POPUPS IF USER IS LOGGED IN
                this.popups['login']['active'] = true;
            } else {
                // ACTIVATE POPUPS IF USER IS LOGGED OUT
                this.popups['login']['active'] = false;
            }
        });

        this._popupsService.onOpenPopup.subscribe((popup_name: string) => {
            this.openPopup(popup_name);
        });

        this._popupsService.onClosePopup.subscribe((popup_name: string) => {
            this.closePopup(popup_name);
        });
    }

    detectActivePopups() {
        // login popup
        (!this._userService.token().length) ? this.popups['login']['active'] = true : this.popups['login']['active'] = false;

        // chat popup
        (!!this._userService.token().length) ? this.popups['chat']['active'] = true : this.popups['chat']['active'] = false;
    }

    openPopup(popup_name: string) {
        this.popups[popup_name]['visible'] = true;
    }

    closePopup(popup_name: string) {
        this.popups[popup_name]['visible'] = false;
    }
}
