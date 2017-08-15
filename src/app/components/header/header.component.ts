import {Component, OnInit} from '@angular/core';
import {Router, NavigationStart} from '@angular/router';

import {UserService} from '../../services/user/user.service';
import {PopupsService} from '../../services/popups/popups.service';
import {IUserInfo} from '../../interfaces/user-info.interface';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
    public expanded: boolean;
    public logged: boolean;
    private _isHomepage: boolean;
    public user_info = new IUserInfo();

    constructor(private _router: Router, private _userService: UserService, private _popupsService: PopupsService) {
        this._router.events.subscribe(e => {
            if (e instanceof NavigationStart) {
                const url = e.url;

                if (url === '/') {
                    this.expanded = true;
                    this._isHomepage = true;
                } else {
                    this.expanded = false;
                    this._isHomepage = false;
                }

                const userToken: string = this._userService.token();
                if (userToken.length > 0 && userToken !== 'undefined') {
                    this.logged = true;
                    this.expanded = false;
                    this.getProfileData();
                } else {
                    this.logged = false;

                    (this._isHomepage) ? this.expanded = true : this.expanded = false;
                }
            }
        });
    }

    getProfileData() {
        // this._storageService.remove('user_info');
        const user_info = this._userService.info();

        if (user_info === undefined) {
            this._userService.onChangeUserInfo.subscribe(response => {
                this.user_info = response;
            });
        } else {
            this.user_info = user_info;
        }
    }

    ngOnInit() {
        this._userService.onChangeToken.subscribe((token: string) => {
            if (token.length > 0 && token !== 'undefined') {
                this.logged = true;
                this.expanded = false;
                this.getProfileData();
            } else {
                this.logged = false;

                (this._isHomepage) ? this.expanded = true : this.expanded = false;
            }
        });

        this._userService.onChangeUserInfo.subscribe((user_info) => {
            this.user_info = user_info;
        });
    }

    callPopup(popup_name: string) {
        this._popupsService.openPopup(popup_name);
    }
}
