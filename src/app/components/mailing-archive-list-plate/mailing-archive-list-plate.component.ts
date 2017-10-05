import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IPaginationMailingArchive} from '../../interfaces/pagination.interface';
import {IMailing} from '../../interfaces/mailing.interface';

@Component({
  selector: 'app-mailing-archive-list-plate',
  templateUrl: './mailing-archive-list-plate.component.html',
  styleUrls: ['./mailing-archive-list-plate.component.sass']
})
export class MailingArchiveListPlateComponent implements OnInit {

  @Input() mailingArchive: IPaginationMailingArchive = new IPaginationMailingArchive();
  @Output() editMailing = new EventEmitter<IMailing>();

  constructor() { }

  ngOnInit() {
    console.log(this.mailingArchive)
  }

  editArchive(mailing: IMailing) {
    this.editMailing.emit(mailing);
  }
}
