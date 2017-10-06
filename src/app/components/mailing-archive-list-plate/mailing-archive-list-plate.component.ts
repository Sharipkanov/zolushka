import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IPaginationBlacklistUsers, IPaginationMailingArchive} from '../../interfaces/pagination.interface';
import {IMailing} from '../../interfaces/mailing.interface';
import {PopupsService} from "../../services/popups/popups.service";
import {MailingService} from "../../services/mailing/mailing.service";
import {IUserBlacklisted} from "../../interfaces/user.interface";

@Component({
  selector: 'app-mailing-archive-list-plate',
  templateUrl: './mailing-archive-list-plate.component.html',
  styleUrls: ['./mailing-archive-list-plate.component.sass']
})
export class MailingArchiveListPlateComponent implements OnInit {

  @Input() mailingArchive: IPaginationMailingArchive = new IPaginationMailingArchive();

  constructor(private _popupsService: PopupsService, private _mailingService: MailingService) {
  }

  ngOnInit() {
    for (let i = 0; i < this.mailingArchive._embedded.mailing.length; i++) {
      this._mailingService.getMailingBlacklist(this.mailingArchive._embedded.mailing[i].id).subscribe((res: IPaginationBlacklistUsers) => {
        if (res._embedded) {
          this.mailingArchive._embedded.mailing[i].blackList = res._embedded.content;
        }
      });

      this._mailingService.getMailingResponded(this.mailingArchive._embedded.mailing[i].id).subscribe((res: IPaginationBlacklistUsers) => {
        if (res._embedded) {
          this.mailingArchive._embedded.mailing[i].respondList = res._embedded.content;
        }
      });
    }
  }

  openBlackList(e: Event) {
    e.preventDefault();
    this._popupsService.openPopup('mailingBlacklist');
  }
}
