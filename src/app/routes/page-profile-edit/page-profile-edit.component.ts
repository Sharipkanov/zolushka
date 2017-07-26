import { Component, EventEmitter, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { DateService } from '../../services/date/date.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EnumsService } from '../../services/enums/enums.service';
import { IEnums } from '../../interfaces/enums';

@Component({
    selector: 'app-page-profile-edit',
    templateUrl: './page-profile-edit.component.html',
    styleUrls: ['./../page-profile/page-profile.component.sass']
})
export class PageProfileEditComponent implements OnInit {

    public FProfile: FormGroup;

    public model = {};
    public enums = new IEnums();
    public enumsDone = false;
    public modelDone = false;

    public onAllDataGet: EventEmitter<any> = new EventEmitter();

    constructor(private _fb: FormBuilder,
                private _userService: UserService,
                private _enums: EnumsService,
                private _dateService: DateService) {

    }

    ngOnInit() {

        this.onAllDataGet.subscribe((res) => {
            this[res] = true;


            if (this.enumsDone && this.modelDone) {
                for (const key in this.FProfile.value) {
                    // console.log(key, typeof this.model[key], typeof this.FProfile.controls[key].value)
                    if (!!this.model[key] && key !== 'birthdate') {
                        this.FProfile.controls[key].setValue(this.model[key]);
                    } else if (key === 'birthdate') {
                        this.FProfile.controls['birthdate'].get('day')
                            .setValue(this.model['birthdateDecoded']['day']);
                        this.FProfile.controls['birthdate'].get('month')
                            .setValue(this.model['birthdateDecoded']['month']);
                        this.FProfile.controls['birthdate'].get('year')
                            .setValue(this.model['birthdateDecoded']['year']);
                    }
                }
            }
        });

        this._userService.profilePageInfo().subscribe(res => {
            this.model = res;

            if (!!res['birthdate']) {
                this.model['birthdateDecoded'] = this._dateService.dateDecode(res['birthdate']);
            }

            this.onAllDataGet.emit('modelDone');
        });

        this._enums.getEnums().subscribe(response => {
            this._dateService.getDatePicker().subscribe(res2 => {
                response.datePicker = res2;
                this.enums = response;
                this.onAllDataGet.emit('enumsDone');
            });
        });

        this.FProfile = this._fb.group({
            name: '',
            aboutMe: '',
            height: '',
            weight: '',
            phone: '',
            birthdate: this._fb.group({
                day: null,
                month: null,
                year: null
            }),
            relationshipTypes: [],
            relationshipState: [],
            appearance: null,
            physique: null,
            hairColor: null,
            eyeColor: null,
            hobbies: [],
            sexualKinds: [],
            sexualPeriodicity: null,
            sexualPreference: null,
            sexualRole: null,
            childrenExist: []
        });
    }

    saveProfileData(e) {
        e.preventDefault();


        const form = this.FProfile.value;
        const data = {
            name: form.name,
            aboutMe: form.aboutMe,
            birthdate: this._dateService.dateEncode(form.birthdate),
            height: parseInt(form.height),
            weight: parseInt(form.weight),
            relationshipTypes: form.relationshipTypes,
            relationshipState: form.relationshipState,
            appearance: form.appearance,
            physique: form.physique,
            hairColor: form.hairColor,
            eyeColor: form.eyeColor,
            hobbies: form.hobbies,
            sexualKinds: form.sexualKinds,
            sexualPeriodicity: form.sexualPeriodicity,
            sexualPreference: form.sexualPreference,
            sexualRole: form.sexualRole,
            childrenExist: form.childrenExist
        };

        // console.log(data);


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
