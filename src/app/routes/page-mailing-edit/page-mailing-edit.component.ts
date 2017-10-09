import {Component, OnInit} from '@angular/core';
import {MailingService} from '../../services/mailing/mailing.service';
import {ActivatedRoute, Router} from '@angular/router';
import {IMailing} from '../../interfaces/mailing.interface';
import {PageLoaderService} from '../../services/page-loader/page-loader.service';

@Component({
  selector: 'app-page-mailing-edit',
  templateUrl: './page-mailing-edit.component.html',
  styleUrls: ['./page-mailing-edit.component.sass', '../../../sass/components/page-section.component.sass', '../../../sass/components/panel.component.sass']
})

export class PageMailingEditComponent implements OnInit {
  public mailing_id;
  public mailing: IMailing;

  constructor(private _pageLoaderService: PageLoaderService, private _router: Router, private _activatedRouter: ActivatedRoute, private _mailingService: MailingService) {
  }

  ngOnInit() {
    this._pageLoaderService.onStartLoad.emit();
    this.mailing_id = this._activatedRouter.snapshot.params['mailing_id'];
    this._mailingService.getActiveMailing(this.mailing_id).subscribe((res: IMailing) => {
      this.mailing = res;
      this._pageLoaderService.onEndLoad.emit();
    }, error => {
      if (error.status === 404) {
        this._router.navigate(['/mailing']);
      } else {
        console.error(error);
      }
    });
  }
}
