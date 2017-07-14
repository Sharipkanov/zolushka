import { Component, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { PopupsService } from '../../../services/popups/popups.service';

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
        }
    };

    constructor(private _userService: UserService, private _popupsService: PopupsService) {
        (!this._userService.token().length) ? this.popups['login']['active'] = true : this.popups['login']['active'] = false;
    }

    ngOnInit() {
        this._userService.onChangeToken.subscribe((token: string) => {
            (!token.length) ? this.popups['login']['active'] = true : this.popups['login']['active'] = false;
        });

        this._popupsService.onOpenPopup.subscribe((popup_name: string) => {
            this.openPopup(popup_name);
        });

        this._popupsService.onClosePopup.subscribe((popup_name: string) => {
            this.closePopup(popup_name);
        });
    }

    openPopup(popup_name: string) {
        this.popups[popup_name]['visible'] = true;
    }

    closePopup(popup_name: string) {
        this.popups[popup_name]['visible'] = false;
    }
}
