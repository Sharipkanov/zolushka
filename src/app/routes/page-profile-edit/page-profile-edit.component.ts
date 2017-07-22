import { AfterContentChecked, Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user/user.service';
import {Http} from '@angular/http';
import {DateService} from '../../services/date/date.service';

@Component({
    selector: 'app-page-profile-edit',
    templateUrl: './page-profile-edit.component.html',
    styleUrls: ['./../page-profile/page-profile.component.sass']
})
export class PageProfileEditComponent implements OnInit, AfterContentChecked {

    public model = {
        name: '',
        about: ''
    };

    public enums = {
        'appearance': [],
        'eyeColor': [],
        'breastSize': [],
        'hairColor': [],
        'higherEducation': [],
        'hobbies': [],
        'physique': [],
        'relationshipState': [],
        'relationshipType': [],
        'sexualKind': [],
        'sexualPeriodicity': [],
        'sexualPreference': [],
        'sexualRole': [],
        'zodiacSign': [],
        'datePicker': {
            'day': [],
            'month': [],
            'year': [],
        }
    };

    constructor(private _userService: UserService, private _http: Http, private _dateService: DateService) {
        this._userService.profilePageInfo().then(res => {
            this.model = res;

            this.model['birthdateDecoded'] = this._dateService.dateDecode(res['birthdate']);

            console.log(this.model);
        });

        this.getEnums();
    }

    ngOnInit() {

    }

    ngAfterContentChecked() {

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
                console.log(response);
                _self._dateService.getDatePicker().then(res => {
                    console.log(res);
                    _self.enums = response;
                    _self.enums.datePicker = res;
                });
            });
    }

    saveProfileData(e) {
        e.preventDefault();

        console.log('submit');

        this._userService.profileUpdate(this.model).then(response => {
            if (response.id !== undefined) {
                this.model = response;
            } else {

            }
        });
    }
}
