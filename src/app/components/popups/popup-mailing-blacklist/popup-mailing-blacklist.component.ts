import { Component, OnInit } from '@angular/core';
import {IPaginationUserSearch} from '../../../interfaces/pagination.interface';
import {MailingService} from '../../../services/mailing/mailing.service';

@Component({
  selector: 'app-popup-mailing-blacklist',
  templateUrl: './popup-mailing-blacklist.component.html',
  styleUrls: ['./popup-mailing-blacklist.component.sass']
})
export class PopupMailingBlacklistComponent implements OnInit {

  public girls: IPaginationUserSearch = new IPaginationUserSearch();
  public preloader: boolean = false;

  constructor(private _mailingService: MailingService) { }

  ngOnInit() {
    this.preloader = true;
    this._mailingService.getMailingDialogs().subscribe((girls: IPaginationUserSearch) => {
      this.girls = <IPaginationUserSearch>girls;
      console.log(girls);
      this.preloader = false;
    });
  }

}
