import {Component, Input, OnInit} from '@angular/core';
import {PopupsService} from '../../services/popups/popups.service';
import {IPaginationBlacklistUsers} from '../../interfaces/pagination.interface';
import {EnumsService} from '../../services/enums/enums.service';
import {MailingService} from '../../services/mailing/mailing.service';
import {ISelectSearchBoxItem} from '../../interfaces/form/select-search-box-item.interface';
import {FormBuilder, FormGroup} from '@angular/forms';
import {LocationService} from '../../services/location/location.service';
import {IMailing} from '../../interfaces/mailing.interface';

@Component({
  selector: 'app-mailing-create-plate',
  templateUrl: './mailing-create-plate.component.html',
  styleUrls: ['./mailing-create-plate.component.sass']
})
export class MailingCreatePlateComponent implements OnInit {
  @Input() firstLoadExtend: boolean = false;
  public relationshipTypes = [];
  public locations: Array<ISelectSearchBoxItem> = [];
  public errors = [];
  public blacklisted: IPaginationBlacklistUsers = new IPaginationBlacklistUsers();

  public preloader: boolean = false;

  public rangeSliderValues = {
    ageFrom: 19,
    ageTo: 27,
  };

  public FMailing: FormGroup;

  constructor(private _locationService: LocationService, private _fb: FormBuilder, private _popupsService: PopupsService, private _enums: EnumsService, private _mailingService: MailingService) {
  }

  ngOnInit() {
    this.preloader = true;
    this._enums.getEnums('relationship-types').subscribe(response => {
      this.relationshipTypes = response;
      this.preloader = false;
    });

    this.initLocation();

    this._mailingService.onBlacklistEdit.subscribe((blacklisted: IPaginationBlacklistUsers) => {
      blacklisted._embedded.clientCard.splice(6, blacklisted._embedded.clientCard.length);
      this.blacklisted = blacklisted;
    });

    this.renderForm();
  }

  renderForm() {
    this.FMailing = this._fb.group({
      city: 0,
      ageFrom: this.rangeSliderValues.ageFrom,
      ageTo: this.rangeSliderValues.ageTo,
      text: '',
      relationshipTypes: {id: null},
    });
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

  searchOnChangeAge(e) {
    this.FMailing.controls['ageFrom'].setValue(e.from);
    this.FMailing.controls['ageTo'].setValue(e.to);
  }

  dropdownEvent(e: Event) {
    e.preventDefault();

    const target: HTMLElement = <HTMLElement>e.target;
    const parent = <HTMLElement>target.closest('.dropdown');

    if (parent.classList.contains('dropdown--active')) {
      parent.classList.remove('dropdown--active');
    } else {
      const dropdownList = document.querySelectorAll('.dropdown.dropdown--active');

      for (let i = 0; i < dropdownList.length; i++) {
        dropdownList[i].classList.remove('dropdown--active');
      }
      parent.classList.add('dropdown--active');
    }
  }

  createMailing(e: Event) {
    e.preventDefault();
    this.preloader = true;
    const createMailingData = this.FMailing.value;
    createMailingData['blackList'] = this.blacklisted._embedded.clientCard;
    this._mailingService.createMailing(createMailingData, 3).subscribe((res: IMailing) => {
      this.preloader = false;
      this._mailingService.onCreateMailing.emit(res);
    });
  }

  openBlackList(e: Event) {
    e.preventDefault();

    this._popupsService.openPopup('mailingBlacklist');
  }

}
