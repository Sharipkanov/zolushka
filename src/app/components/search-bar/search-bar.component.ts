import { Component, OnInit, Input, ElementRef, ViewEncapsulation, Output, EventEmitter } from '@angular/core';

import { StorageService } from '../../services/storage/storage.service';
import { LocationService } from '../../services/location/location.service';
import { ISelectSearchBoxItem } from '../../interfaces/form/select-search-box-item.interface';
import { IEnums } from '../../interfaces/enums.interface';
import { EnumsService } from '../../services/enums/enums.service';
import { Form, FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'app-search-bar',
    templateUrl: './search-bar.component.html',
    styleUrls: ['./search-bar.component.sass'],
    providers: [LocationService],
    encapsulation: ViewEncapsulation.None
})
export class SearchBarComponent implements OnInit {
    @Input() widget: boolean = false;
    @Input() classes: string = '';
    @Output() onSubmitSearchBar: EventEmitter<any> = new EventEmitter();


    public locations: Array<ISelectSearchBoxItem> = [];
    public hiddenSearchBarFilters = true;

    private searchBarActiveClass: string = 'search-bar--active';
    private searchBarToggleTimeout: any;
    private searchBarMainToggleTimeout: any;
    public searchType = 200;
    public FSearchBar: FormGroup;

    public enums = new IEnums();

    constructor(private _activatedRouter: ActivatedRoute, private _fb: FormBuilder, private _enums: EnumsService, private _component: ElementRef, private _locationService: LocationService) {
    }

    initLocation(locationName: string = null) {
        this._locationService.getLocations(locationName).subscribe((locations: Array<any>) => {
            if (locationName !== null) {
                this.locations = [];
            }

            if (!locations) {
                return;
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

    searchProfiles(e) {
        e.preventDefault();
        this.onSubmitSearchBar.emit(this.FSearchBar.value);
    }

    searchBarToggle(e) {
        e.preventDefault();

        const searchBar: HTMLElement = this._component.nativeElement.children[0];
        const searchBarContent: HTMLElement = <HTMLElement>searchBar.getElementsByClassName('search-bar__content')[0];

        clearTimeout(this.searchBarMainToggleTimeout);
        clearTimeout(this.searchBarToggleTimeout);

        if (searchBar.classList.contains(this.searchBarActiveClass)) {
            this.searchBarMainToggleTimeout = setTimeout(() => {
                searchBarContent.style.overflow = 'hidden';

                this.searchBarToggleTimeout = setTimeout(() => {
                    searchBar.classList.remove(this.searchBarActiveClass);
                }, 1);
            }, 1);
        } else {
            this.searchBarMainToggleTimeout = setTimeout(() => {
                searchBar.classList.add(this.searchBarActiveClass);

                this.searchBarToggleTimeout = setTimeout(() => {
                    searchBarContent.style.overflow = 'initial';
                }, 501);
            }, 1);
        }
    }

    ngOnInit() {
        this.initLocation();

        this._enums.getEnums().subscribe(response => {
            this.enums = response;

            this.renderFormChosenValues();
        });
    }

    renderFormChosenValues() {
        const filterParams = this._activatedRouter.snapshot.params;
        const newFilterObject = {};
        for (const key in filterParams) {
            const array = filterParams[key].split(',');
            if (array.length > 1) {
                newFilterObject[key] = [];
                for (let i = 0; i < array.length; i++) {
                    newFilterObject[key].push({ id: array[i] });
                }
            } else {
                newFilterObject[key] = { id: parseInt(filterParams[key], 0) };
            }
        }

        this.FSearchBar = this._fb.group({
            type: [(!!newFilterObject['type']) ? newFilterObject['type'] : { id: 200 }],
            cityId: null,
            relationshipTypes: [(!!newFilterObject['relationshipTypes']) ? newFilterObject['relationshipTypes'] : {}],
            appearance: [(!!newFilterObject['appearance']) ? newFilterObject['appearance'] : {}],
            sexualPeriodicity: [(!!newFilterObject['sexualPeriodicity']) ? newFilterObject['sexualPeriodicity'] : {}],
            relationshipState: [(!!newFilterObject['relationshipState']) ? newFilterObject['relationshipState'] : {}],
            childrenExist: [(!!newFilterObject['childrenExist']) ? newFilterObject['childrenExist'] : {}],
            hairColor: [(!!newFilterObject['hairColor']) ? newFilterObject['hairColor'] : {}],
            eyeColor: [(!!newFilterObject['eyeColor']) ? newFilterObject['eyeColor'] : {}],
            sexualRole: [(!!newFilterObject['sexualRole']) ? newFilterObject['sexualRole'] : {}],
            zodiacsign: [(!!newFilterObject['zodiacsign']) ? newFilterObject['zodiacsign'] : {}],
            physique: [(!!newFilterObject['physique']) ? newFilterObject['physique'] : {}],
            higherEducation: [(!!newFilterObject['higherEducation']) ? newFilterObject['higherEducation'] : {}],
            breastSize: [(!!newFilterObject['breastSize']) ? newFilterObject['breastSize'] : {}],
            sexualKinds: [(!!newFilterObject['sexualKinds']) ? newFilterObject['sexualKinds'] : {}],
            sexualPreference: [(!!newFilterObject['sexualPreference']) ? newFilterObject['sexualPreference'] : {}],
            hobbies: [(!!newFilterObject['hobbies']) ? newFilterObject['hobbies'] : {}],
        });

        this.hiddenSearchBarFilters = false;
    }

    switchType(e) {
        this.searchType = parseInt(e.target.value, 0);
    }

}
