import {Component, Input, OnInit} from '@angular/core';
import {PopupsService} from '../../../services/popups/popups.service';

@Component({
  selector: 'app-popup-reg-to-dialog',
  templateUrl: './popup-reg-to-dialog.component.html',
  styleUrls: ['./popup-reg-to-dialog.component.sass']
})
export class PopupRegToDialogComponent implements OnInit {

  @Input() visible: boolean = false;

  constructor(private _popupsService: PopupsService) { }

  ngOnInit() {
  }

  closePopup(e) {
    if (e.target.classList.contains('popup-wrapper') || e.target.classList.contains('js-close-popup')) {
      this._popupsService.closePopup('regToPopup');
    }
  }

}
