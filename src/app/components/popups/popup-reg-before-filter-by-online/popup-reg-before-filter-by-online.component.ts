import { Component, Input, OnInit } from '@angular/core';
import { PopupsService } from '../../../services/popups/popups.service';

@Component({
  selector: 'app-popup-reg-before-filter-by-online',
  templateUrl: './popup-reg-before-filter-by-online.component.html',
  styleUrls: ['./popup-reg-before-filter-by-online.component.sass', '../../../../sass/components/page-section.component.sass']
})
export class PopupRegBeforeFilterByOnlineComponent implements OnInit {

  @Input() visible: boolean = false;

  constructor(private _popupsService: PopupsService) { }

  ngOnInit() {
  }

  closePopup(e) {
    if (e.target.classList.contains('popup-wrapper') || e.target.classList.contains('js-close-popup')) {
      this._popupsService.closePopup('regBeforeFilterByOnline');
    }
  }

}
