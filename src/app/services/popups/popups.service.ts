import { EventEmitter, HostListener, Injectable } from '@angular/core';

@Injectable()
export class PopupsService {

  onOpenPopup: EventEmitter<string> = new EventEmitter<string>();
  onClosePopup: EventEmitter<string> = new EventEmitter<string>();
  onChangePopup: EventEmitter<object> = new EventEmitter<object>();

  constructor() { }

  openPopup(popup_name: string) {

    this.onOpenPopup.emit(popup_name);
  }

  closePopup(popup_name: string) {

    this.onClosePopup.emit(popup_name);
  }

  changePopup(changePopupObject: object) {

    this.onChangePopup.emit(changePopupObject);
  }

}
