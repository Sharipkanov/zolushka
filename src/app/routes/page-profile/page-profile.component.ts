import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../services/http/http.service';
import {UserService} from '../../services/user/user.service';
import {Http} from "@angular/http";

@Component({
    selector: 'app-page-profile',
    templateUrl: './page-profile.component.html',
    styleUrls: ['./page-profile.component.sass']
})
export class PageProfileComponent implements OnInit {

    public user = {};
    public model = {};
    public enums = {};

    constructor(private _http: Http, private _userService: UserService) {

        this.user = this._userService.info();
        this.getEnums().then(response => this.enums = response);


        this._userService.profilePageInfo().then(res => {
            this.model = res;

            console.log(this.model);
        });
    }

    ngOnInit() {
    }

    getEnums(): Promise<any> {
        const _self = this;

        return new Promise((resolve, reject) => {

            this._http.get('/api/api/reference/client/list')
                .toPromise()
                .then(response => {
                    response = response.json();

                    resolve(response);
                });
        });
    }

}
