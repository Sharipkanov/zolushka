import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {PopupsService} from '../../../services/popups/popups.service';

@Component({
  selector: 'app-popups',
  templateUrl: './popups.component.html',
  styleUrls: ['./popups.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class PopupsComponent implements OnInit {
  public props;
  public HTML = document.getElementsByTagName('html')[0];
  public popups = {
    login: false,
    chat: false,
    buyConfirmedPhotos: false,
    regBeforeFilterByOnline: false,
    regBeforeFilterByRealPhoto: false,
    confirmPhoto: false,
    regToDialog: false,
    saveSearch: false,
    mailingBlacklist: false
  };

  public openingAnimation = false;

  constructor(private _popupsService: PopupsService) {
  }

  ngOnInit() {
    this._popupsService.onOpenPopup.subscribe((data) => {
      this.openPopup(data);
    });

    this._popupsService.onClosePopup.subscribe((popup_name: string) => {
      this.closePopup(null, popup_name);
    });
  }

  openPopup({popup, data}) {
    this.popups[popup] = true;
    this.props = data;
    this.HTML.classList.add('popup--opened');
    setTimeout(() => {
      this.openingAnimation = true;
    }, 20);
  }

  closePopup(e: Event, popup_name: string = null) {
    if (e) {
      const target: HTMLElement = <HTMLElement>e.target;

      if (target.classList.contains('popup-wrapper') || target.classList.contains('js-close-popup') || target.closest('.js-close-popup')) {
        this.openingAnimation = false;
        setTimeout(() => {
          this.HTML.classList.remove('popup--opened');
          for (const key of Object.keys(this.popups)) {
            this.popups[key] = false;
          }
        }, 300);
      }
    } else {
      this.openingAnimation = false;
      setTimeout(() => {
        this.HTML.classList.remove('popup--opened');
        this.popups[popup_name] = false;
      }, 300);
    }

    this.props = null;
  }
}
