import { EventEmitter, HostListener, Injectable } from '@angular/core';

@Injectable()
export class PopupsService {

  onOpenPopup: EventEmitter<object> = new EventEmitter<object>();
  onClosePopup: EventEmitter<object> = new EventEmitter<object>();
  onChangePopup: EventEmitter<object> = new EventEmitter<object>();

  constructor() { }

  openPopup(popup_name: string, data = null) {
    this.onOpenPopup.emit({popup: popup_name, data: data});
  }

  closePopup(popup_name: string) {
    this.onClosePopup.emit({popup: popup_name});
  }

  changePopup(changePopupObject: object) {
    this.onChangePopup.emit(changePopupObject);
  }
}
