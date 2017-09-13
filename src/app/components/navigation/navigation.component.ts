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

    constructor(private _popupsService: PopupsService, private _userService: UserService) {
    }

    ngOnInit() {
        this.user_info = this._userService.info();
        console.log(this.user_info);
    }

    navigationLogout() {
        this._userService.logout();
    }

    openChat(e) {
        e.preventDefault();

        this._popupsService.openPopup('chat');
    }
}
