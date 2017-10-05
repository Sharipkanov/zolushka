import {Component, Input, OnInit} from '@angular/core';
import {IMailing} from '../../interfaces/mailing.interface';

@Component({
  selector: 'app-mailing-editing',
  templateUrl: './mailing-editing.component.html',
  styleUrls: ['./mailing-editing.component.sass']
})
export class MailingEditingComponent implements OnInit {

  @Input() editingMailing: IMailing = <IMailing>{};

  constructor() { }

  ngOnInit() {
  }

}
