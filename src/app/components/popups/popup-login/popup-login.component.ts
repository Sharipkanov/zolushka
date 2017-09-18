import { Component, Input, OnInit } from '@angular/core';
import { PopupsService } from '../../../services/popups/popups.service';
import { UserService } from '../../../services/user/user.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-popup-login',
    templateUrl: './popup-login.component.html',
    styleUrls: ['./popup-login.component.sass']
})
export class PopupLoginComponent implements OnInit {

    public FLogin: FormGroup;
    public preloader = false;

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

    loginFormSubmit(e) {
        e.preventDefault();
        this.preloader = true;

        const data = {
            email: this.FLogin.value.email,
            password: this.FLogin.value.password
        };

        this._userService.login(data).subscribe(res => {
            console.log(res);
            this.preloader = false;
        }, error => {
            console.log(error);
            this.preloader = false;
        });
    }
}
