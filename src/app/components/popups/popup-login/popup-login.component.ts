import { Component, Input, OnInit } from '@angular/core';
import { PopupsService } from '../../../services/popups/popups.service';
import { UserService } from '../../../services/user/user.service';

@Component({
    selector: 'app-popup-login',
    templateUrl: './popup-login.component.html',
    styleUrls: ['./popup-login.component.sass']
})
export class PopupLoginComponent implements OnInit {

    @Input()
    public visible: boolean = false;
    public model: object = {
        email: '',
        password: ''
    };

    constructor(private _popupsService: PopupsService, private _userService: UserService) {
    }

    ngOnInit() {
        this._userService.onChangeToken.subscribe((token: string) => {
            if (token !== '') {
                this._popupsService.closePopup('login');
            }
        });
    }

    updateState(event) {
        this.model[event.field] = event.value;
        console.log(this.model);
    }

    closePopup(e) {
        if (e.target.classList.contains('popup-wrapper') || e.target.classList.contains('js-close-popup')) {
            this._popupsService.closePopup('login');
        }
    }

    loginFormSubmit(e) {
        e.preventDefault();

        const data = {
            email: this.model['email'],
            password: this.model['password']
        };

        this._userService.login(data);
    }
}
