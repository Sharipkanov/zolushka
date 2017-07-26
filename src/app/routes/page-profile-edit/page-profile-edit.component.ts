import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user/user.service';
import {DateService} from '../../services/date/date.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {EnumsService} from '../../services/enums/enums.service';
import {IEnums} from '../../interfaces/enums';

@Component({
    selector: 'app-page-profile-edit',
    templateUrl: './page-profile-edit.component.html',
    styleUrls: ['./../page-profile/page-profile.component.sass']
})
export class PageProfileEditComponent implements OnInit {

    public model = {};

    public FProfile: FormGroup;

    public enums = new IEnums();

    constructor(private _fb: FormBuilder,
                private _userService: UserService,
                private _enums: EnumsService,
                private _dateService: DateService) {

    }

    ngOnInit() {
        this._userService.profilePageInfo().subscribe(res => {
            this.model = res;

            if (!!res['birthdate']) {
                this.model['birthdateDecoded'] = this._dateService.dateDecode(res['birthdate']);
            }

            console.log(this.model);
            for (const key in this.FProfile.value) {
                // console.log(key, typeof this.model[key], typeof this.FProfile.controls[key].value)
                if (!!this.model[key] && key !== 'birthdate') {
                    this.FProfile.controls[key].setValue(this.model[key]);
                }
            }
        });

        this._enums.getEnums().subscribe(response => {
            this._dateService.getDatePicker().subscribe(res => {
                this.enums = response;
                this.enums.datePicker = res;
                console.log(this.enums);
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


        const form = this.FProfile.value;
        console.log(form.hobbies);
        const data = {
            name: form.name,
            aboutMe: form.aboutMe,
            // birthdate: this._dateService.dateEncode(form.birthdate),
            // height: form.height as number,
            // weight: form.weight as number,
            // relationshipTypes: form.relationshipTypes,
            // relationshipState: form.relationshipState,
            // appearance: form.appearance,
            // physique: form.physique,
            // hairColor: form.hairColor,
            // eyeColor: form.eyeColor,
            hobbies: form.hobbies,
            // sexualKinds: form.sexualKinds,
            // sexualPeriodicity: form.sexualPeriodicity,
            // sexualPreference: form.sexualPreference,
            // sexualRole: form.sexualRole,
            childrenExist: {
                id: form.childrenExist
            }
        };

        console.log(data);


        this._userService.profileUpdate(data).subscribe(response => {
            console.log(response);
            if (response.id !== undefined) {
                this.model = response;
            } else {

            }
        }, error => {
            console.log(error);
        });
    }
}
