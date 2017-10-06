import {Component, HostListener, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {PopupsService} from '../../services/popups/popups.service';
import {IPaginationBlacklistUsers} from '../../interfaces/pagination.interface';
import {EnumsService} from '../../services/enums/enums.service';
import {MailingService} from '../../services/mailing/mailing.service';
import {ISelectSearchBoxItem} from '../../interfaces/form/select-search-box-item.interface';
import {FormBuilder, FormGroup} from '@angular/forms';
import {LocationService} from '../../services/location/location.service';
import {IMailing} from '../../interfaces/mailing.interface';
import {ISelectBoxItem} from '../../interfaces/form/select-box-item.interface';
import {Router} from '@angular/router';

@Component({
  selector: 'app-mailing-create-plate',
  templateUrl: './mailing-create-plate.component.html',
  styleUrls: ['./mailing-create-plate.component.sass', '../dropdown/dropdown.component.sass', '../form/input-box/input-box.component.sass', '../search-bar/search-bar.component.sass', '../../../sass/components/panel.component.sass'],
  providers: [LocationService],
  encapsulation: ViewEncapsulation.None
})
export class MailingCreatePlateComponent implements OnInit {
  @Input() firstLoadExtend: boolean = false;
  @Input() editingMailing: IMailing;

  public relationshipTypes: Array<ISelectBoxItem> = [];
  public locations: Array<ISelectSearchBoxItem> = [];
  public errors = [];
  public blacklisted: IPaginationBlacklistUsers = new IPaginationBlacklistUsers();

  public preloader: boolean = false;
  public showForm: boolean = false;

  public rangeSliderValues = {
    ageFrom: 19,
    ageTo: 27,
  };

  public FMailing: FormGroup;

  constructor(private _router: Router, private _locationService: LocationService, private _fb: FormBuilder, private _popupsService: PopupsService, private _enums: EnumsService, private _mailingService: MailingService) {
  }

  @HostListener('document:click', ['$event'])
  clickOutsideOfComponent(e) {
    if (!e.target.closest('.dropdown') && document.querySelector('.dropdown.dropdown--active')) {
      const dropdownList = document.querySelectorAll('.dropdown.dropdown--active');
      for (let i = 0; i < dropdownList.length; i++) {
        dropdownList[i].classList.remove('dropdown--active');
      }
    }
  }

  ngOnInit() {
    if (this.editingMailing) {
      this.rangeSliderValues.ageFrom = this.editingMailing.ageFrom;
      this.rangeSliderValues.ageTo = this.editingMailing.ageTo;
    }

    this.showForm = false;
    this.preloader = true;
    this._enums.getEnums('relationship-types').subscribe(response => {
      this.relationshipTypes = response;
      this.preloader = false;
      this.renderForm();
    });

    this.initLocation();

    this._mailingService.onBlacklistEdit.subscribe((blacklisted: IPaginationBlacklistUsers) => {
      blacklisted._embedded.clientCard.splice(6, blacklisted._embedded.clientCard.length);
      this.blacklisted = blacklisted;
    });
  }

  renderForm() {
    this.FMailing = this._fb.group({
      city: !!this.editingMailing ? this.editingMailing.city : null,
      ageFrom: !!this.editingMailing ? this.editingMailing.ageFrom : this.rangeSliderValues.ageFrom,
      ageTo: !!this.editingMailing ? this.editingMailing.ageTo : this.rangeSliderValues.ageTo,
      text: !!this.editingMailing ? this.editingMailing.text : null,
      relationshipTypes: !!this.editingMailing ? [this.editingMailing.relationshipTypes] : null,
    });
    this.showForm = true;
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

  searchOnChangeAgeFinish(e) {
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

  saveMailing(e: Event) {
    e.preventDefault();
    this.preloader = true;
    const MailingData = this.FMailing.value;
    MailingData['blackList'] = this.blacklisted._embedded.clientCard;
    if (this.editingMailing) {
      console.log(MailingData);
      this._mailingService.editMailing(MailingData, this.editingMailing.id).subscribe((res: IMailing) => {
        this.preloader = false;
        this._router.navigate(['/mailing']); // TODO узнать локигу сохранения и возобновления рассылки
      });
    } else {
      this._mailingService.createMailing(MailingData, 3).subscribe((res: IMailing) => {
        this.preloader = false;
        this._mailingService.onCreateMailing.emit(res);
      });
    }
  }

  openBlackList(e: Event) {
    e.preventDefault();

    this._popupsService.openPopup('mailingBlacklist');
  }

  stopMailing(e: Event) {
    e.preventDefault();
    if (this.editingMailing) {
      this._mailingService.stopMailing(this.editingMailing.id).subscribe((res) => {
        this._router.navigate(['/mailing']);
      })
    }
  }

}
