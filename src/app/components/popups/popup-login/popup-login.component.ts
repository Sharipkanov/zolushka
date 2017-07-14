import { Component, Input, OnInit } from '@angular/core';
import { PopupsService } from '../../../services/popups/popups.service';
import { UserService } from '../../../services/user/user.service';
import { ILogin } from "../../../interfaces/login.interface";

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

        console.log(data);

        this._userService.login(data).subscribe(response => {
            // console.log(response);
            if (!!response.accessToken) {
                this._userService.setToken(response.accessToken);
                this._popupsService.closePopup('login');
            } else {
                // TODO make error handling
            }
        });
    }
}
