import {Component, OnInit} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {FormBuilder, FormControl, FormGroup, NgForm} from '@angular/forms';
import {ILocation} from '../../../interfaces/location.interface';
import {LocationService} from '../../../services/location/location.service';
import {ISelectSearchBoxItem} from '../../../interfaces/form/select-search-box-item.interface';
import {UserService} from '../../../services/user/user.service';
import {DateService} from '../../../services/date/date.service';

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
    public purposes: Array<Object> = [];

    constructor(private _fb: FormBuilder, private _http: Http, private _locationService: LocationService, private _userService: UserService, private _dateService: DateService) {
    }

    ngOnInit() {
        this.FRegistration = this._fb.group({
            email: '',
            name: '',
            password: '',
            cityId: '',
            type: [
                []
            ],
            birthdate: this._fb.group({
                day: '',
                month: '',
                year: '',
            })
        });

        this.initLocation();
        this.initBirthPicker();
        this.initTypePicker();
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

        this._http.post('/api/auth/signup', {...this.user}, {headers: headers})
            .subscribe(response => {
                console.log(response);
                this.errors = [];
                this._userService.setToken(response.json().accessToken);
            }, error => {
                console.log(error);
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
        this._dateService.getDatePicker().subscribe(res => this.date_picker = res);
    }

    initTypePicker() {
        this._http.get('/api/api/reference/client/type')
            .map(response => response.json())
            .subscribe(response => {

                response.map(value => {
                    this.type_picker.push({
                        title: value.shortTitle,
                        value: value.id,
                        checked: false
                    });
                });
            });
    }

}
