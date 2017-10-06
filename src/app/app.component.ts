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
      this._popupsService.openPopup(target.getAttribute('data-popup-target'));
    }
  }

  constructor(private _popupsService: PopupsService, translate: TranslateService) {
    translate.setDefaultLang('ru');
    translate.use('ru');
  }
}
