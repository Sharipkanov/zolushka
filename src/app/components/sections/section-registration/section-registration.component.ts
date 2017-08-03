import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {EnumsService} from "../../../services/enums/enums.service";
import {DateService} from "../../../services/date/date.service";
import {LocationService} from "../../../services/location/location.service";
import {UserService} from "../../../services/user/user.service";
import {ISelectSearchBoxItem} from "../../../interfaces/form/select-search-box-item.interface";
import {Router} from "@angular/router";
import {PopupsService} from "../../../services/popups/popups.service";

@Component({
    selector: 'app-section-registration',
    templateUrl: './section-registration.component.html',
    styleUrls: ['./section-registration.component.sass'],
    providers: [LocationService]
})
export class SectionRegistrationComponent implements OnInit {

    public FRegistration: FormGroup;
    public type_picker = [];
    public date_picker = {
        day: [],
        month: [],
        year: []
    };

    public locations: Array<ISelectSearchBoxItem> = [];
    public errors = [];

    constructor(private _popupsService: PopupsService, private _router: Router, private _locationService: LocationService, private _userService: UserService, private _fb: FormBuilder, private _enums: EnumsService, private _dateService: DateService) {
    }

    ngOnInit() {
        this.FRegistration = this._fb.group({
            email: null,
            name: null,
            password: null,
            city: null,
            type: null,
            birthdate: this._fb.group({
                day: null,
                month: null,
                year: null,
            })
        });

        this.initLocation();

        this._dateService.getDatePicker().subscribe(res => this.date_picker = res);

        this._enums.getEnums('type').subscribe(response => {
            response.map(value => {
                this.type_picker.push({
                    title: value.shortTitle,
                    id: value.id,
                    checked: false
                });
            });
        });
    }

    initLocation(locationName: string = null) {
        this._locationService.getLocations(locationName).subscribe((locations: Array<any>) => {
            if (locationName !== null) {
                this.locations = [];
            }

            locations.map((location: any) => {
                this.locations.push({
                    id: location.id,
                    selected: false,
                    label: location.title,
                    labelInfo: location.country.title
                });
            });
        });
    }

    getLocations(locationName) {
        this.initLocation(locationName);
    }

    userRegister(e: Event) {
        e.preventDefault();

        const data = {
            name: this.FRegistration.value.name,
            email: this.FRegistration.value.email,
            city: this.FRegistration.value.city,
            password: this.FRegistration.value.password,
            type: this.FRegistration.value.type,
            birthdate: this._dateService.dateEncode(this.FRegistration.value.birthdate)
        };

        this._userService.register(data).subscribe(response => {
            // console.log(response);
            this.errors = [];
            this._userService.setToken(response.json().accessToken);
            this._router.navigate(['/']); // this will navigate to Home state.
        }, error => {
            this.errors = [];
            if (error) {
                const res = error.json();

                if (res.errors) {
                    res.errors.map((value) => {
                        this.errors[value.field] = value.message;
                    });
                }
            }
        });
    }

    openPopup(name) {
        this._popupsService.openPopup(name);
    }
}
