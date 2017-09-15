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

    public popups = {
        login: false,
        chat: false,
        buyConfirmedPhotos: false,
        regBeforeFilterByOnline: false,
        regBeforeFilterByRealPhoto: false,
        confirmPhoto: false,
        regToDialog: false
    };

    constructor(private _popupsService: PopupsService) {
    }

    ngOnInit() {
        this._popupsService.onOpenPopup.subscribe((popup_name: string) => {
            this.openPopup(popup_name);
        });

        this._popupsService.onClosePopup.subscribe((popup_name: string) => {
            this.closePopup(popup_name);
        });
    }

    openPopup(popup_name: string) {
        this.popups[popup_name] = true;
    }

    closePopup(popup_name: string) {
        this.popups[popup_name] = false;
    }
}
