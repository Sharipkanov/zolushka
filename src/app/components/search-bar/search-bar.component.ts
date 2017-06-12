import { Component, OnInit, Input } from '@angular/core';

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

  constructor(private locationService: LocationService) { }

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
