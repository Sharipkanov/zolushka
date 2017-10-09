import {Component, Input, OnInit} from '@angular/core';
import {IPaginationBlacklistUsers} from '../../../interfaces/pagination.interface';
import {MailingService} from '../../../services/mailing/mailing.service';
import {IUserBlacklisted} from '../../../interfaces/user.interface';
import {PopupsService} from '../../../services/popups/popups.service';

@Component({
  selector: 'app-popup-mailing-blacklist',
  templateUrl: './popup-mailing-blacklist.component.html',
  styleUrls: ['./popup-mailing-blacklist.component.sass']
})
export class PopupMailingBlacklistComponent implements OnInit {
  @Input() props = {
    blacklisted: new IPaginationBlacklistUsers(),
    options: {
      readonly: false
    }
  };

  public girls: IPaginationBlacklistUsers = new IPaginationBlacklistUsers();
  public preloader: boolean = false;
  public selectedAll = false;

  constructor(private _mailingService: MailingService, private _popupsService: PopupsService) {
  }

  ngOnInit() {
    this.preloader = true;
    if (this.props.options.readonly === true) {
      this.girls = this.props.blacklisted;
      this.preloader = false;
    } else {
      this._mailingService.getMailingDialogs().subscribe((girls: IPaginationBlacklistUsers) => {
        this.girls = <IPaginationBlacklistUsers>girls;
        if (!!this.props.blacklisted._embedded.clientCard) {
          for (let i = 0; i < this.girls._embedded.clientCard.length; i++) {
            for (let z = 0; z < this.props.blacklisted._embedded.clientCard.length; z++) {
              if (this.girls._embedded.clientCard[i].id === this.props.blacklisted._embedded.clientCard[z].id) {
                this.girls._embedded.clientCard[i]._selected = true;
              }
            }
          }
        }
        this.preloader = false;
      });
    }
  }

  switchBlacklist(user: IUserBlacklisted = null) {
    if (!user) {
      for (let i = 0; i < this.girls._embedded.clientCard.length; i++) {
        (this.selectedAll === false)
          ? this.girls._embedded.clientCard[i]._selected = true
          : this.girls._embedded.clientCard[i]._selected = false

      }
    } else {
      user._selected = !user._selected;
    }

    this.checkChoseAllButton();
  }

  checkChoseAllButton() {
    const result = [];
    for (let i = 0; i < this.girls._embedded.clientCard.length; i++) {
      if (this.girls._embedded.clientCard[i]._selected) {
        result.push(true);
      }
    }

    (result.length === this.girls._embedded.clientCard.length)
      ? this.selectedAll = true
      : this.selectedAll = false;
  }

  filterBlacklist(e: Event) {
    const target: HTMLInputElement = <HTMLInputElement>e.target;
    const inputVal = target.value;

    for (let i = 0; i < this.girls._embedded.clientCard.length; i++) {
      (inputVal !== '' && this.girls._embedded.clientCard[i].name.indexOf(inputVal))
        ? this.girls._embedded.clientCard[i]._hidden = true
        : this.girls._embedded.clientCard[i]._hidden = false
    }
  }

  saveBlacklist() {
    const response: IPaginationBlacklistUsers = new IPaginationBlacklistUsers();
    response._embedded.clientCard = [];
    for (let i = 0; i < this.girls._embedded.clientCard.length; i++) {
      if (this.girls._embedded.clientCard[i]._selected) {
        response._embedded.clientCard.push(this.girls._embedded.clientCard[i]);
      }
    }

    response.page.totalElements = response._embedded.clientCard.length;

    this._mailingService.onBlacklistEdit.emit(response);
    this._popupsService.closePopup('mailingBlacklist');
  }
}
