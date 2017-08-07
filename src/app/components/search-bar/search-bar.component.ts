import {Component, OnInit, Input, ElementRef, ViewEncapsulation} from '@angular/core';

import {StorageService} from '../../services/storage/storage.service';
import {LocationService} from '../../services/location/location.service';
import {ISelectSearchBoxItem} from '../../interfaces/form/select-search-box-item.interface';
import {IEnums} from '../../interfaces/enums';
import {EnumsService} from '../../services/enums/enums.service';

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

    public locations: Array<ISelectSearchBoxItem> = [];

    private searchBarActiveClass: string = 'search-bar--active';
    private searchBarToggleTimeout: any;
    private searchBarMainToggleTimeout: any;
    public searchType = 200;

    public enums = new IEnums();

    constructor(private _enums: EnumsService, private _component: ElementRef, private _locationService: LocationService, private _storageService: StorageService) {
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

        const form = e.target;
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
            console.log(response)
        });
    }

    switchType(e) {
        this.searchType = parseInt(e.target.value, 0);
    }

}
