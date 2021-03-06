import { EventEmitter, HostListener, Injectable } from '@angular/core';

@Injectable()
export class PopupsService {

  onOpenPopup: EventEmitter<object> = new EventEmitter<object>();
  onClosePopup: EventEmitter<string> = new EventEmitter<string>();
  onChangePopup: EventEmitter<object> = new EventEmitter<object>();

  constructor() { }

  openPopup(popup_name: string, data = null) {
    this.onOpenPopup.emit({popup: popup_name, data: data});
  }

  closePopup(popup_name: string) {
    this.onClosePopup.emit(popup_name);
  }

  changePopup(changePopupObject: object) {
    this.onChangePopup.emit(changePopupObject);
  }
}
