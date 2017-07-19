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
        'appearance': [],
        'eye-color': [],
        'breast-size': [],
        'hair-color': [],
        'higher-education': [],
        'hobby': [],
        'physique': [],
        'relationship-state': [],
        'relationship-type': [],
        'sexual-kind': [],
        'sexual-periodicity': [],
        'sexual-preference': [],
        'sexual-role': [],
        'zodiac-sign': [],
    };

    constructor(private _userService: UserService, private _http: Http) {
        this._userService.profile_page_info().then(res => {
            this.model = res;

            console.log(this.model);
        });

        this.getEnums();
    }

    ngOnInit() {
        this.initBirthPicker();
    }

    updateState(event) {
        this.model[event.field] = event.value;
        console.log(this.model);
    }

    getEnums() {
        const _self = this;
        this._http.get('/api/api/reference/client/list')
            .map(response => response.json())
            .subscribe(response => {
                this.enums = response;

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

    saveProfileData(e) {
        e.preventDefault();

        console.log('submit');
    }
}
