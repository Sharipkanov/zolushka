import {Component, Input, OnInit} from '@angular/core';
import {IMailing} from '../../interfaces/mailing.interface';

@Component({
  selector: 'app-mailing-current-active-mailing',
  templateUrl: './mailing-current-active-mailing.component.html',
  styleUrls: ['./mailing-current-active-mailing.component.sass', '../../../sass/components/panel.component.sass']
})
export class MailingCurrentActiveMailingComponent implements OnInit {

  @Input() mailing: IMailing = <IMailing>{};

  constructor() { }

  ngOnInit() {
  }

}
