import {Component, Input, OnInit} from '@angular/core';
import {PopupsService} from '../../../services/popups/popups.service';

@Component({
  selector: 'app-popup-notice-confirmed-photos',
  templateUrl: './popup-notice-confirmed-photos.component.html',
  styleUrls: ['./popup-notice-confirmed-photos.component.sass', '../../../../sass/components/page-section.component.sass']
})
export class PopupNoticeConfirmedPhotosComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
}
