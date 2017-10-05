import {Component, HostListener, OnInit, ViewEncapsulation} from '@angular/core';
import {EnumsService} from '../../services/enums/enums.service';
import {ISelectSearchBoxItem} from '../../interfaces/form/select-search-box-item.interface';
import {LocationService} from '../../services/location/location.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {PopupsService} from "../../services/popups/popups.service";
import {IPaginationBlacklistUsers, IPaginationMailingArchive} from "../../interfaces/pagination.interface";
import {MailingService} from "../../services/mailing/mailing.service";
import {IMailing} from "../../interfaces/mailing.interface";
import {PageLoaderService} from "../../services/page-loader/page-loader.service";

@Component({
  selector: 'app-page-mailing',
  templateUrl: './page-mailing.component.html',
  styleUrls: ['./page-mailing.component.sass', '../../components/dropdown/dropdown.component.sass', '../../components/form/input-box/input-box.component.sass', '../../components/search-bar/search-bar.component.sass', '../../../sass/components/panel.component.sass'],
  providers: [LocationService],
  encapsulation: ViewEncapsulation.None
})
export class PageMailingComponent implements OnInit {
  public activeMailing: IMailing = null;
  public mailingArchive: IPaginationMailingArchive = new IPaginationMailingArchive();
  public editingMailing: IMailing;

  @HostListener('document:click', ['$event'])
  clickOutsideOfComponent(e) {
    if (!e.target.closest('.dropdown') && document.querySelector('.dropdown.dropdown--active')) {
      const dropdownList = document.querySelectorAll('.dropdown.dropdown--active');
      for (let i = 0; i < dropdownList.length; i++) {
        dropdownList[i].classList.remove('dropdown--active');
      }
    }
  }

  constructor(private _pageLoaderService: PageLoaderService, private _mailingService: MailingService, private _popupsService: PopupsService, private _fb: FormBuilder, private _enums: EnumsService, private _locationService: LocationService) { }

  ngOnInit() {
    this._pageLoaderService.onStartLoad.emit();
    this._mailingService.onCreateMailing.subscribe((mailing: IMailing) => {
      this.activeMailing = mailing;
    });

    this._mailingService.getMailingArchive().subscribe((res: IPaginationMailingArchive) => {
      this.mailingArchive = res;
    });

    this._mailingService.getActiveMailing().subscribe((res: IMailing) => {
      this.activeMailing = res;
      console.log(res);
      this._pageLoaderService.onEndLoad.emit();
    }, error => {
      this.activeMailing = undefined;
      this._pageLoaderService.onEndLoad.emit()
    });
  }

  openEditMailingPlate(mailing: IMailing) {
    this.editingMailing = mailing;
    console.log('editing mailing', this.editingMailing)
  }
}
