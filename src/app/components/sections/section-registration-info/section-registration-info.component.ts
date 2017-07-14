import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { NgForm } from '@angular/forms';
import { ILocation } from '../../../interfaces/location.interface';
import { LocationService } from '../../../services/location/location.service';
import { ISelectSearchBoxItem } from '../../../interfaces/form/select-search-box-item.interface';
import { UserService } from '../../../services/user/user.service';

@Component({
    selector: 'app-section-registration-info',
    templateUrl: './section-registration-info.component.html',
    styleUrls: ['./section-registration-info.component.sass'],
    providers: [LocationService]
})
export class SectionRegistrationInfoComponent implements OnInit {

    user: object = {};
    errors: object = {};
    form_birth_date: Array<object> = [];
    form_birth_month: Array<object> = [];
    form_birth_year: Array<object> = [];
    type_picker: Array<object> = [];

    public locations: Array<ISelectSearchBoxItem> = [];
    public purposes: Array<Object> = [];

    constructor(private _http: Http, private _locationService: LocationService, private _userService: UserService) {
    }

    initLocation(locationName: string = null) {
        this._locationService.getLocations(locationName).subscribe((locations: Array<ILocation>) => {
            if (locationName !== null) {
                this.locations = [];
            }

            locations.map((location: ILocation) => {
                this.locations.push({
                    value: location.id,
                    selected: false,
                    label: location.name,
                    labelInfo: location.country
                });
            });
        });
    }

    getLocations(locationName) {
        this.initLocation(locationName);
    }

    userRegister(e: Event) {
        e.preventDefault();

        const headers: Headers = new Headers();

        headers.append('Content-Type', 'application/json');

        this._http.post('/api/auth/signup', { ...this.user }, { headers: headers })
            .subscribe(response => {
                this.errors = [];
                this._userService.setToken(response.json().accessToken);
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

    updateState(event) {
        this.user[event.field] = event.value;
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

    initTypePicker() {
        this._http.get('/api/api/reference/client/type')
            .map(response => response.json())
            .subscribe(response => {

                response.map(value => {
                    this.type_picker.push({
                        label: value.shortTitle,
                        value: value.id,
                        checked: false
                    });
                });
            });
    }

    ngOnInit() {
        this.initLocation();
        this.initBirthPicker();
        this.initTypePicker();
    }

}
