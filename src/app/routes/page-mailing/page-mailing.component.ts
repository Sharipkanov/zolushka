import { Component, OnInit } from '@angular/core';
import {EnumsService} from '../../services/enums/enums.service';
import {ISelectSearchBoxItem} from '../../interfaces/form/select-search-box-item.interface';
import {LocationService} from '../../services/location/location.service';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-page-mailing',
  templateUrl: './page-mailing.component.html',
  styleUrls: ['./page-mailing.component.sass'],
  providers: [LocationService]
})
export class PageMailingComponent implements OnInit {

  public relationshipTypes = [];
  public locations: Array<ISelectSearchBoxItem> = [];
  public errors = [];

  public FMailing: FormGroup;
  constructor(private _fb: FormBuilder, private _enums: EnumsService, private _locationService: LocationService) { }

  ngOnInit() {
    this.FMailing = this._fb.group({
      city: 0
    });

    this._enums.getEnums('relationship-types').subscribe(response => {
      this.relationshipTypes = response;
    });

    this.initLocation();
  }

  initLocation(locationName: string = null) {
    this._locationService.getLocations(locationName).subscribe((locations: Array<any>) => {
      const locationsArray = [];
      locations.map((location: any) => {
        locationsArray.push({
          id: location.id,
          selected: false,
          label: location.title,
          labelInfo: location.country.title
        });
      });

      this.locations = locationsArray;
    });
  }

  getLocations(locationName) {
    this.initLocation(locationName);
  }
}
