import {Component, HostListener} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {PopupsService} from './services/popups/popups.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  public headerExpanded: boolean;

  @HostListener('document:click', ['$event'])
  clickOnDoc(e: Event) {
    const target = <HTMLElement>e.target;

    if (target.classList.contains('js-open-popup') || target.closest('.js-open-popup')) {
      let popup_name;
      if (target.closest('.js-open-popup')) {
        popup_name = target.closest('.js-open-popup').getAttribute('data-popup-target');
      } else if (target.classList.contains('js-open-popup')) {
        popup_name = target.getAttribute('data-popup-target');
      }
      this._popupsService.openPopup(popup_name);
    }

    if (target.classList.contains('js-close-popup') || target.closest('.js-close-popup') || target.classList.contains('popup-wrapper')) {
      let popup_name;
      if (target.classList.contains('js-close-popup')) {
        if (target.hasAttribute('data-close-popup')) {
          popup_name = target.getAttribute('data-close-popup');
        } else {
          popup_name = target.closest('.popup-wrapper').getAttribute('data-popup');
        }

      } else if (target.closest('.js-close-popup')) {
        if (target.closest('.js-close-popup').hasAttribute('data-close-popup')) {
          popup_name = target.closest('.js-close-popup').getAttribute('data-close-popup');
        } else {
          popup_name = target.closest('.popup-wrapper').getAttribute('data-popup');
        }
      } else if (target.classList.contains('popup-wrapper')) {
        popup_name = target.getAttribute('data-popup');
      }

      this._popupsService.closePopup(popup_name);
    }
  }

  constructor(private _popupsService: PopupsService, translate: TranslateService) {
    translate.setDefaultLang('ru');
    translate.use('en');
  }
}
