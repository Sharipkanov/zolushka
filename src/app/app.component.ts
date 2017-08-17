import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
 public headerExpanded: boolean;

  constructor(translate: TranslateService) {
      translate.setDefaultLang('ru');
      translate.use('ru');
  }
}
