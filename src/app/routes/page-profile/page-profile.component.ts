import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../services/http/http.service';
import {UserService} from '../../services/user/user.service';
import {Http} from "@angular/http";
import {EnumsService} from "../../services/enums/enums.service";
import {forEach} from "@angular/router/src/utils/collection";

@Component({
    selector: 'app-page-profile',
    templateUrl: './page-profile.component.html',
    styleUrls: ['./page-profile.component.sass']
})
export class PageProfileComponent implements OnInit {

    public user = {};
    public model = {};
    public enums = {};

    constructor(private _http: Http, private _userService: UserService, private _enums: EnumsService) {
    }

    ngOnInit() {
        this.user = this._userService.info();
        this.enums = this._enums.getEnums();

        this._userService.profilePageInfo().subscribe(res => {
            this.model = res;
            this.model['bodyCondition'] = [];
            if (this.model['hairColor']) {
                this.model['bodyCondition'].push(this.model['hairColor']['title']);
            }
            if (this.model['eyeColor']) {
                this.model['bodyCondition'].push(this.model['eyeColor']['title']);
            }
            if (this.model['physique']) {
                this.model['bodyCondition'].push(this.model['physique']['title']);
            }
            if (this.model['appearance']) {
                this.model['bodyCondition'].push(this.model['appearance']['title']);
            }
        });

        console.log(this.user);
    }
}
