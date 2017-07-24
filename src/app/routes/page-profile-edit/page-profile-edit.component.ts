import { AfterContentChecked, Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user/user.service';
import {Http} from '@angular/http';
import {DateService} from '../../services/date/date.service';
import {FormBuilder, FormControlName, FormGroup} from '@angular/forms';

@Component({
    selector: 'app-page-profile-edit',
    templateUrl: './page-profile-edit.component.html',
    styleUrls: ['./../page-profile/page-profile.component.sass']
})
export class PageProfileEditComponent implements AfterContentChecked {

    public model = {};

    public FProfile: FormGroup;

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

    constructor(private _fb: FormBuilder, private _userService: UserService, private _http: Http, private _dateService: DateService) {
        this._userService.profilePageInfo().subscribe(res => {
            this.model = res;

            this.model['birthdateDecoded'] = this._dateService.dateDecode(res['birthdate']);

            console.log(this.model);
        });

        this.getEnums();
    }

    ngAfterContentChecked() {
        this.FProfile = this._fb.group({
            name: this.model['name'],
            aboutMe: '',
            height: '',
            weight: '',
            phone: '',
        })
    }

    getEnums() {
        const _self = this;
        this._http.get('/api/api/reference/client/list')
            .map(response => response.json())
            .subscribe(response => {
                console.log(response);
                _self._dateService.getDatePicker().subscribe(res => {
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
