import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { Http } from '@angular/http';

@Component({
    selector: 'app-page-profile-edit',
    templateUrl: './page-profile-edit.component.html',
    styleUrls: ['./../page-profile/page-profile.component.sass']
})
export class PageProfileEditComponent implements OnInit {

    form_birth_date: Array<object> = [];
    form_birth_month: Array<object> = [];
    form_birth_year: Array<object> = [];

    public model = {
        name: '',
        about: ''
    };

    public enums: object = {
        appearance: []
    };

    constructor(private _userService: UserService, private _http: Http) {
        this._userService.profile_page_info().then(res => {
            this.model = res;
        });

        this.getEnums();
    }

    ngOnInit() {
        this.initBirthPicker();
    }

    updateState(event) {
        this.model[event.field] = event.value;
    }

    getEnums() {
        const _self = this;
        this._http.get('/api/api/reference/client/list')
            .map(response => response.json())
            .subscribe(response => {
                this.enums = response;
                for (const key in this.enums) {

                    for (let i = 0; i < this.enums[key].length; i++) {
                        for (const myKey in this.enums[key][i]) {
                            if (myKey === 'title') {
                                this.enums[key][i]['label'] = this.enums[key][i][myKey];
                            }
                            // this.enums[key][i][myKey].label = this.enums[key][i][myKey].title;
                        }
                    }
                }

                console.log(this.enums);
            });
    }

    initBirthPicker() {
        this._http.get('./assets/json/date_picker.json')
            .map(response => response.json())
            .subscribe(response => this.form_birth_date = response);
        this._http.get('./assets/json/month_picker.json')
            .map(response => response.json())
            .subscribe(response => this.form_birth_month = response);
        this._http.get('./assets/json/year_picker.json')
            .map(response => response.json())
            .subscribe(response => this.form_birth_year = response);
    }
}
