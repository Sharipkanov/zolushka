import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user/user.service';
import {DateService} from '../../services/date/date.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {EnumsService} from '../../services/enums/enums.service';

@Component({
    selector: 'app-page-profile-edit',
    templateUrl: './page-profile-edit.component.html',
    styleUrls: ['./../page-profile/page-profile.component.sass']
})
export class PageProfileEditComponent implements OnInit {

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

    constructor(private _fb: FormBuilder,
                private _userService: UserService,
                private _enums: EnumsService,
                private _dateService: DateService) {

    }

    ngOnInit() {
        this._userService.profilePageInfo().subscribe(res => {
            this.model = res;

            this.model['birthdateDecoded'] = this._dateService.dateDecode(res['birthdate']);

            console.log(this.model);
            console.log(this.FProfile.controls.birthdate.value);

            for (const key in this.FProfile.value) {
                if (!!this.model[key] && typeof this.model[key] === 'string' && typeof this.model[key] === typeof this.FProfile.controls[key].value) {
                    this.FProfile.controls[key].setValue(this.model[key]);
                }
            }
        });

        this._enums.getEnums().subscribe(response => {
            this._dateService.getDatePicker().subscribe(res => {
                this.enums = response;
                this.enums.datePicker = res;
            });
        });

        this.FProfile = this._fb.group({
            name: '',
            aboutMe: '',
            height: '',
            weight: '',
            phone: '',
            birthdate: this._fb.group({
                day: 2,
                month: 2,
                year: 1992
            }),
            relationshipTypes: [[100, 200]],
            relationshipState: [],
            appearance: 0,
            physique: 0,
            hairColor: 0,
            eyeColor: 0,
            hobbies: [],
            sexualKinds: [[100, 200]],
            sexualPeriodicity: null,
            sexualPreference: null,
            sexualRole: null,
            childrenExist: []
        });
    }

    saveProfileData(e) {
        e.preventDefault();

        console.log(this.FProfile.value);


        /*this._userService.profileUpdate(this.model).then(response => {
         if (response.id !== undefined) {
         this.model = response;
         } else {

         }
         });*/
    }
}
