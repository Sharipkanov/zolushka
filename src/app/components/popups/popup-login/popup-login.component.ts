import { Component, Input, OnInit } from '@angular/core';
import { PopupsService } from '../../../services/popups/popups.service';
import { UserService } from '../../../services/user/user.service';
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";

@Component({
    selector: 'app-popup-login',
    templateUrl: './popup-login.component.html',
    styleUrls: ['./popup-login.component.sass']
})
export class PopupLoginComponent implements OnInit {

    @Input() visible: boolean = false;

    public FLogin: FormGroup;

    constructor(private fb: FormBuilder, private _popupsService: PopupsService, private _userService: UserService) {
    }

    ngOnInit() {
        this.FLogin = this.fb.group({
            email: '',
            password: '',
        });

        this._userService.onChangeToken.subscribe((token: string) => {
            if (token !== '') {
                this._popupsService.closePopup('login');
            }
        });
    }

    closePopup(e) {
        if (e.target.classList.contains('popup-wrapper') || e.target.classList.contains('js-close-popup')) {
            this._popupsService.closePopup('login');
        }
    }

    loginFormSubmit(e) {
        e.preventDefault();

        const data = {
            email: this.FLogin.value.email,
            password: this.FLogin.value.password
        };

        console.log(data);

        this._userService.login(data);
    }
}
