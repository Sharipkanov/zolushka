import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import {IUserInfo} from '../../interfaces/user-info.interface';
import {PopupsService} from '../../services/popups/popups.service';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.sass']
})
export class NavigationComponent implements OnInit {

    @Input()
    public user_info = new IUserInfo();

    constructor(private _popupsService: PopupsService, private _user: UserService) {
    }

    ngOnInit() {
    }

    navigationLogout() {
        this._user.logout();
    }

    openChat(e) {
        e.preventDefault();

        this._popupsService.openPopup('chat');
    }
}
