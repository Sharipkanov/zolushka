import {Component, HostListener, OnInit, ViewEncapsulation} from '@angular/core';
import {EnumsService} from '../../services/enums/enums.service';
import {ISelectSearchBoxItem} from '../../interfaces/form/select-search-box-item.interface';
import {LocationService} from '../../services/location/location.service';
import {FormBuilder} from '@angular/forms';
import {PopupsService} from '../../services/popups/popups.service';
import {
  IPaginationBlacklistUsers, IPaginationMailingArchive,
  IPaginationUserSearch
} from '../../interfaces/pagination.interface';
import {MailingService} from '../../services/mailing/mailing.service';
import {IMailing} from '../../interfaces/mailing.interface';
import {PageLoaderService} from '../../services/page-loader/page-loader.service';

@Component({
  selector: 'app-page-mailing',
  templateUrl: './page-mailing.component.html',
  styleUrls: ['./page-mailing.component.sass'],
  providers: [LocationService],
  encapsulation: ViewEncapsulation.None
})
export class PageMailingComponent implements OnInit {
  public activeMailing: IMailing = null;
  public mailingArchive: IPaginationMailingArchive = new IPaginationMailingArchive();
  public editingMailing: IMailing;

  constructor(private _pageLoaderService: PageLoaderService, private _mailingService: MailingService, private _popupsService: PopupsService, private _fb: FormBuilder, private _enums: EnumsService, private _locationService: LocationService) {
  }

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
      this._mailingService.getMailingBlacklist(this.activeMailing.id).subscribe((blackList: IPaginationBlacklistUsers) => {
        this.activeMailing._blackList = blackList;
      });
      this._mailingService.getMailingRespondList(this.activeMailing.id).subscribe((respondList: IPaginationUserSearch) => {
        this.activeMailing._respondList = respondList;
      });
      this._pageLoaderService.onEndLoad.emit();
    }, error => {
      this.activeMailing = undefined;
      this._pageLoaderService.onEndLoad.emit();
    });
  }
}
