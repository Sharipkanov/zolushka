import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.sass']
})
export class NavigationComponent implements OnInit {

    @Input()
    public user_info: object = {};

    constructor(private _user: UserService) {
    }

    ngOnInit() {
    }

    navigationLogout() {
        console.log('logout');
        this._user.logout();
    }
}
