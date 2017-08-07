import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms';
import { ILocation } from '../../../interfaces/location.interface';
import { LocationService } from '../../../services/location/location.service';
import { ISelectSearchBoxItem } from '../../../interfaces/form/select-search-box-item.interface';
import { UserService } from '../../../services/user/user.service';
import { DateService } from '../../../services/date/date.service';
import { Router } from "@angular/router";
import {EnumsService} from "../../../services/enums/enums.service";
import {ISelectBoxItem} from "../../../interfaces/form/select-box-item.interface";

@Component({
    selector: 'app-section-registration-info',
    templateUrl: './section-registration-info.component.html',
    styleUrls: ['./section-registration-info.component.sass'],
    providers: [LocationService]
})
export class SectionRegistrationInfoComponent implements OnInit {

    public FRegistration: FormGroup;

    public user: object = {};
    public errors: object = {};
    public date_picker = {
        day: [],
        month: [],
        year: []
    };
    public type_picker: Array<object> = [];

    public locations: Array<ISelectSearchBoxItem> = [];

    constructor(private _enums: EnumsService, private _router: Router, private _fb: FormBuilder, private _locationService: LocationService, private _userService: UserService, private _dateService: DateService) {
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

        // console.log(this.FRegistration.value)
        const data = {
            name: this.FRegistration.value.name,
            email: this.FRegistration.value.email,
            city: this.FRegistration.value.city,
            password: this.FRegistration.value.password,
            type: this.FRegistration.value.type,
            birthdate: this._dateService.dateEncode(this.FRegistration.value.birthdate)
        };

        console.log(data);

        this._userService.register(data).subscribe(response => {
            // console.log(response);
            this.errors = [];
            this._userService.setToken(response.json().accessToken);
            this._router.navigate(['/']); // this will navigate to Home state.
        }, error => {
            // console.log(error);
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

}
