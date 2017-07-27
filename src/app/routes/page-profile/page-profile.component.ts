import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../services/http/http.service';
import {UserService} from '../../services/user/user.service';
import {Http} from "@angular/http";
import {EnumsService} from "../../services/enums/enums.service";
import {forEach} from "@angular/router/src/utils/collection";
import {IUserInfo} from "../../interfaces/user-info";

@Component({
    selector: 'app-page-profile',
    templateUrl: './page-profile.component.html',
    styleUrls: ['./page-profile.component.sass']
})
export class PageProfileComponent implements OnInit {

    public user_info = new IUserInfo();
    public model = {};
    public enums = {};

    constructor(private _userService: UserService, private _enums: EnumsService) {
    }

    ngOnInit() {
        const user_info = this._userService.info();
        if (user_info === undefined) {
            this._userService.onChangeUserInfo.subscribe(res => {
                this.user_info = res;
                this.getProfilPageInfo(this.user_info);
            });
        } else {
            this.user_info = user_info;
            this.getProfilPageInfo(this.user_info);
        }
    }

    getProfilPageInfo(user_info) {
        this.enums = this._enums.getEnums();

        this._userService.profilePageInfo(user_info).subscribe(res => {
            this.model = res;
            this.model['_bodyCondition'] = [];
            this.model['_sexualSection'] = [];

            for (const key in this.model) {
                if (key === 'hairColor' || key === 'eyeColor' || key === 'physique' || key === 'appearance') {
                    if (!!this.model[key]) {
                        this.model['_bodyCondition'].push(this.model[key]['title']);
                    }
                } else if (key === 'sexualPeriodicity' || key === 'sexualPreference' || key === 'sexualRole') {
                    if (!!this.model[key]) {
                        this.model['_sexualSection'].push(this.model[key]['title']);
                    }
                } else if (key === 'sexualKinds') {
                    if (!!this.model[key]) {
                        this.model['sexualKinds'].map(sex => {
                            this.model['_sexualSection'].push(sex['title']);
                        });
                    }
                }
            }
        });
    }
}
