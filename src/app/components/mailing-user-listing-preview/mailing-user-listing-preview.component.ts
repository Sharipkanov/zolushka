import {Component, Input, OnInit} from '@angular/core';
import {IPaginationUserSearch} from '../../interfaces/pagination.interface';
import {PopupsService} from '../../services/popups/popups.service';

@Component({
  selector: 'app-mailing-user-listing-preview',
  templateUrl: './mailing-user-listing-preview.component.html',
  styleUrls: ['./mailing-user-listing-preview.component.sass']
})
export class MailingUserListingPreviewComponent implements OnInit {

  @Input() users: IPaginationUserSearch = new IPaginationUserSearch();
  @Input() openBlacklist: boolean = false;

  constructor(private _popupsService: PopupsService) {
  }

  ngOnInit() {
  }

  openBlackList(e: Event) {
    e.preventDefault();

    if (this.openBlacklist) {
      this._popupsService.openPopup('mailingBlacklist', {
        blacklisted: this.users,
        options: {readonly: !!this.users._embedded.clientCard}
      });
    }
  }
}
