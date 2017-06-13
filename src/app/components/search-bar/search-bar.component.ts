import { Component, OnInit, Input, ElementRef } from '@angular/core';

import { LocationService } from '../../services/location/location.service';
import { ISelectSearchBoxItem } from '../../interfaces/form/select-search-box-item.interface';
import { ILocation } from '../../interfaces/location.interface';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.sass']
})
export class SearchBarComponent implements OnInit {
  @Input() widget: boolean = false;
  @Input() classes: string = '';

  public locations: Array<ISelectSearchBoxItem> = [];
  public purposes: Array<Object> = [];

  private searchBarActiveClass: string = 'search-bar--active';
  private searchBarToggleTimeout: any;

  constructor(private _component: ElementRef, private locationService: LocationService) { }

  initLocation(locationName: string = null) {
    this.locationService.getLocations(locationName).subscribe((locations: Array<ILocation>) => {
      if (locationName !== null) {
        this.locations = [];
      }

      locations.map((location: ILocation) => {
        this.locations.push({
          label: location.name,
          labelInfo: location.country
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

    clearTimeout(this.searchBarToggleTimeout);

    if (searchBar.classList.contains(this.searchBarActiveClass)) {
      searchBarContent.style.overflow = 'hidden';

      this.searchBarToggleTimeout = setTimeout(() => {
        searchBar.classList.remove(this.searchBarActiveClass);
      }, 1);
    } else {
      searchBar.classList.add(this.searchBarActiveClass);

      this.searchBarToggleTimeout = setTimeout(() => {
        searchBarContent.style.overflow = 'auto';
      }, 501);
    }
  }

  ngOnInit() {
    this.initLocation();

    this.purposes = [
      {
        label: 'Цель знакомства',
        text: 'Отчистить',
        value: 0,
        selected: true
      },
      {
        label: 'Цель 1',
        value: 1,
        selected: false
      },
      {
        label: 'Цель 2',
        value: 2,
        selected: false
      },
      {
        label: 'Цель 3',
        value: 3,
        selected: false
      },
    ];
  }

}
